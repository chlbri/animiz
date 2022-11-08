import type {
  LengthOf,
  StateMatching,
  TuplifyUnion,
} from '@bemedev/decompose';
import {
  BaseActionObject,
  EventObject,
  interpret,
  InterpreterStatus,
  NoInfer,
  Prop,
  ResolveTypegenMeta,
  ServiceMap,
  StateMachine,
  StateValue,
  TypegenDisabled,
  TypegenEnabled,
  Typestate,
} from 'xstate';
import {
  matches as matchesD,
  MatchOptions,
} from '~services/utils/machine/matches';
import { useAssignTest } from './assign';
import { useGuardTest } from './guard';
import { useSendParentTest } from './sendParent';
import type { ActionKey, GuardKey, Options } from './types';

export const useServiceTest = <
  TContext extends object,
  TEvents extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  TAction extends BaseActionObject = BaseActionObject,
  TServiceMap extends ServiceMap = ServiceMap,
  TResolvedTypesMeta = ResolveTypegenMeta<
    TypegenDisabled,
    NoInfer<TEvents>,
    TAction,
    TServiceMap
  >
>(
  machine: StateMachine<
    TContext,
    any,
    TEvents,
    TTypestate,
    TAction,
    TServiceMap,
    TResolvedTypesMeta
  >
) => {
  let service = interpret(machine);

  const start = () => service.start();
  const stop = () => service.stop();

  const context = <T = TContext>(
    expected: T,
    selector?: (context: TContext) => T
  ) => {
    const innerContext = service.getSnapshot().context;
    const actual = selector ? selector(innerContext) : innerContext;
    expect(actual).toEqual(expected);
  };

  const sender = <T extends TEvents['type']>(type: T) => {
    type E = Required<TEvents> extends { type: T } & infer U
      ? LengthOf<TuplifyUnion<Extract<U, { type: T }>>> extends 0
        ? []
        : [Omit<Extract<TEvents, { type: T }>, 'type'>]
      : never;

    const fn = (...[event]: E) => {
      service.send({ type, ...event } as any);
    };
    return fn;
  };

  // #region Matches
  // #region Types
  type TSV = TResolvedTypesMeta extends TypegenEnabled
    ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'matchesStates'>
    : never;

  type MatchesProps = MatchOptions<
    StateMatching<TSV extends StateValue ? TSV : StateValue>
  >[];
  // #endregion

  const _matches = matchesD(service.getSnapshot().value);

  const matches = (...nodes: MatchesProps) => {
    const actual = _matches(...nodes);
    expect(actual).toBe(true);
  };
  // #endregion

  // #region HasTags
  type Tags = (TResolvedTypesMeta extends TypegenEnabled
    ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'tags'>
    : string)[];

  const hasTags = (...values: Tags) => {
    const state = service.getSnapshot();
    const actual = values.every((value) => state.hasTag(value));
    expect(actual).toBe(true);
  };
  // #endregion

  // #region Hooks
  type _ActionKey = ActionKey<TContext, TEvents, TResolvedTypesMeta>;
  type _GuardKey = GuardKey<TContext, TEvents, TResolvedTypesMeta>;

  const useSendParent = (action: _ActionKey) => {
    return useSendParentTest(machine, action);
  };
  const useAssign = (action: _ActionKey) => useAssignTest(machine, action);
  const useGuard = (guard: _GuardKey) => useGuardTest(machine, guard);
  //TODO: Create useAssign to use machine as promise
  // #endregion

  type _Options = Options<TContext, TEvents, TResolvedTypesMeta>;
  const rebuild = (context?: TContext, options?: _Options) => {
    const status = service.status;
    if (status === InterpreterStatus.Running) {
      stop();
    }

    let innerMachine: any = machine;

    if (context) {
      innerMachine = innerMachine.withContext(context);
    }

    if (options) {
      innerMachine = innerMachine.withConfig(options);
    }

    service = interpret(innerMachine);
  };

  return {
    sender,
    context,
    matches,
    start,
    stop,
    hasTags,
    useSendParent,
    useAssign,
    useGuard,
    rebuild,
  };
};
