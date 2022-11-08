import { createMachine } from 'xstate';
import type { QueryFilter } from './urlBuilder.machine';

const extractParamsMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./extractParams.machine.typegen').Typegen0,
    schema: {
      events: {} as { type: 'EXTRACT'; url: URL },
      context: {} as {
        searchParams?: URLSearchParams;
        entries?: [string, string][];
        obj?: Record<string, unknown>;
        data?: QueryFilter;
      },
      services: {} as {
        parse: { data: QueryFilter };
      },
    },

    initial: 'idle',
    states: {
      idle: {
        description: 'Start of the machine',
        on: {
          EXTRACT: {
            actions: ['assignSearchParams'],
            target: 'extraction',
            description: 'Extract from the URL all searchParams',
          },
        },
      },
      extraction: {
        always: {
          actions: ['generateEntries', 'generateObject'],
          target: 'parsing',
        },
        description: 'Prepare data for parsing',
      },
      parsing: {
        invoke: {
          src: 'parse',
          onDone: {
            actions: ['assignData'],
            target: 'success',
          },
          onError: 'error',
        },
        description: 'Using "zod" to parse to QueryFilter',
      },
      error: {
        entry: ['escalateError'],
        type: 'final',
        description: 'Cannot parse data',
      },
      success: {
        type: 'final',
        data: ({ data }) => data,
      },
    },
  },
  {
    actions: {},
    services: {},
  }
);

export default extractParamsMachine;
