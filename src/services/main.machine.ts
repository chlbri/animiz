import { createMachine } from 'xstate';
import type { Events } from './main.types';

export const machine = createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import('./main.machine.typegen').Typegen0,
  schema: {
    events: {} as Events,
  },

  states: {
    idle: {
      always: 'working',
    },
    working: {
      type: 'parallel',
      states: {
        theme: {
          on: {
            CHANGE_THEME: {
              actions: ['changeTheme'],
            },
          },
        },
      },
    },
  },
});
