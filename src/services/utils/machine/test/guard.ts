import type {
  BaseActionObject,
  EventObject,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  StateMachine,
  TypegenDisabled,
  Typestate,
} from 'xstate';
import { isTestHelperDefined } from './helpers';
import type { Action, TestHelper } from './types';

export const useGuardTest = <
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
  >,
  name: string
) => {
  const guard = machine.options.guards?.[name] as Action<
    TContext,
    TEvents,
    boolean
  >;
  if (!guard) throw 'Guard not exists';
  const mockFn = vi.fn(guard);

  const acceptance = () => {
    expect(guard).toBeInstanceOf(Function);
  };

  const testExpect = (helper: TestHelper<TContext, TEvents, boolean>) => {
    const checkAll = isTestHelperDefined(helper);
    if (!checkAll) return;

    const { context, event, expected } = helper;
    expect(mockFn(context, event)).toEqual(expected);
  };

  return [acceptance, testExpect, mockFn] as const;
};
