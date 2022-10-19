import { Accessor, createMemo, createRoot, from } from 'solid-js';
import {
  BaseActionObject,
  EventObject,
  interpret,
  NoInfer,
  Prop,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  StateMachine,
  TypegenDisabled,
  TypegenEnabled,
  Typestate,
} from 'xstate';
import { matches as matchesD, MatchOptions } from '~utils/machine';

export function createInterpret<
  TContext,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  TAction extends BaseActionObject = BaseActionObject,
  TServiceMap extends ServiceMap = ServiceMap,
  TResolvedTypesMeta = ResolveTypegenMeta<
    TypegenDisabled,
    NoInfer<TEvent>,
    TAction,
    TServiceMap
  >
>(
  machine: StateMachine<
    TContext,
    any,
    TEvent,
    TTypestate,
    TAction,
    TServiceMap,
    TResolvedTypesMeta
  >
) {
  const service = interpret(machine);
  const store = createRoot(() => from(service.start())) as Accessor<
    State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>
  >;

  const context = <T>(
    accessor?: (ctx: TContext) => T,
    equals?: (prev: T, next: T) => boolean
  ) => {
    const memo = createRoot(() =>
      createMemo(
        () =>
          !!accessor
            ? accessor(store().context)
            : (store().context as unknown as T),
        undefined,
        { equals }
      )
    );
    return memo;
  };

  const hasTags = (
    ...values: (TResolvedTypesMeta extends TypegenEnabled
      ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'tags'>
      : string)[]
  ) => values.every((value) => store().hasTag(value));

  const value = createRoot(() =>
    createMemo(() => store().value, undefined, {
      equals(prev, next) {
        return prev === next;
      },
    })
  );

  const matches = (...values: MatchOptions[]) => {
    return createRoot(() =>
      createMemo(() => matchesD(value())(...values))
    );
  };

  const output = {
    send: service.send,
    subscribe: service.subscribe.bind(service),
    matches,
    context,
    hasTags,
  } as const;

  return output;
}
