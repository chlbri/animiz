import type { LengthOf, TuplifyUnion } from '@bemedev/core';
import type { StateMatching, StateValue } from '@bemedev/decompose';
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

export type SenderProps<
  TEvent extends EventObject = EventObject,
  T extends TEvent['type'] = string
> = TEvent extends { type: T } & infer U
  ? LengthOf<TuplifyUnion<Omit<U, 'type'>>> extends 0
    ? never
    : [Omit<U, 'type'>]
  : never;

type T1 = { type: 'eerer'; arg: 2 } | { type: 'two' };

type T2 = Extract<T1, { type: 'two' }>;

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

  type TSV = TResolvedTypesMeta extends TypegenEnabled
    ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'matchesStates'>
    : never;

  type UseMatchesProps = MatchOptions<
    StateMatching<TSV extends StateValue ? TSV : StateValue>
  >[];

  const matches = (...values: UseMatchesProps) => {
    return createRoot(() =>
      createMemo(() => {
        const fn = matchesD(value());
        return fn(...values);
      })
    );
  };

  const sender = <T extends TEvent['type']>(type: T) => {
    type E = TEvent extends { type: T } & infer U
      ? LengthOf<TuplifyUnion<Extract<U, { type: T }>>> extends 0
        ? []
        : [Omit<U, 'type'>]
      : never;

    const func = (...[event]: E) => {
      if (event) {
        service.send({ type, ...event } as any);
      } else {
        event;
        service.send(type);
      }
    };
    return func;
  };

  const output = {
    sender,
    send: service.send,
    subscribe: service.subscribe.bind(service),
    matches,
    context,
    hasTags,
  } as const;

  return output;
}
