import type { EventObject } from 'xstate';

export type Action<
  Context extends object = {},
  Events extends EventObject = EventObject,
  T = any
> = (context?: Context, event?: Events) => T;

export type TestHelper<
  Context extends object = {},
  Events extends EventObject = EventObject,
  T = any
> = {
  context?: Context;
  event?: Events;
  expected: T;
};
