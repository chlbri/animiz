import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';

export type QueryFilter = {
  text?: string | null;
  year?: string | null;
  format?: string | null;
  airingStatus?: string | null;
  country?: string | null;
  genres?: string[] | null;
};

type Context = QueryFilter & { url?: URL };
type Events = { type: 'QUERY' } & QueryFilter;

export const queryBuilderMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./queryBuilder.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },

    initial: 'idle',
    states: {
      idle: {
        on: {
          QUERY: {
            actions: ['addParams'],
            target: 'params',
          },
        },
      },
      params: {
        initial: 'url',
        states: {
          url: {
            always: {
              actions: ['createURL'],
              target: 'text',
            },
          },
          text: {
            always: [
              {
                cond: 'hasText',
                actions: ['addText'],
                target: 'year',
              },
              'year',
            ],
          },
          year: {
            always: [
              {
                cond: 'hasYear',
                actions: ['addYear'],
                target: 'genre',
              },
              'genre',
            ],
          },
          genre: {
            always: [
              {
                cond: 'hasGenre',
                actions: ['addGenre'],
                target: 'format',
              },
              'format',
            ],
          },
          format: {
            always: [
              {
                cond: 'hasFormat',
                actions: ['addFormat'],
                target: 'airingStatus',
              },
              'airingStatus',
            ],
          },
          airingStatus: {
            always: [
              {
                cond: 'hasAiringStatus',
                actions: ['addAiringStatus'],
                target: 'country',
              },
              'country',
            ],
          },
          country: {
            always: [
              {
                cond: 'hasCountry',
                actions: ['addCountry'],
                target: '#final',
              },
              '#final',
            ],
          },
        },
      },

      final: {
        id: 'final',
        type: 'final',
        data: ({ url }) => url,
      },
    },
  },
  {
    actions: {
      addAiringStatus: assign((ctx) => {
        ctx.url!.searchParams.append('airingStatus', ctx.airingStatus!);
      }),

      addCountry: assign((ctx) => {
        ctx.url!.searchParams.append('country', ctx.country!);
      }),

      addFormat: assign((ctx) => {
        ctx.url!.searchParams.append('format', ctx.format!);
      }),

      addParams: assign((ctx, { type, ...params }) => {
        ctx = params;
      }),

      addText: assign((ctx) => {
        ctx.url!.searchParams.append('text', ctx.text!);
      }),

      addYear: assign((ctx) => {
        ctx.url!.searchParams.append('year', ctx.year!);
      }),

      createURL: assign((ctx) => {
        ctx.url = new URL('localhost:3000/api/mangas.json');
      }),
    },
    guards: {
      hasAiringStatus: ({ airingStatus }) => !!airingStatus,
      hasCountry: ({ country }) => !!country,
      hasFormat: ({ format }) => !!format,
      hasText: ({ text }) => !!text,
      hasYear: ({ year }) => !!year,
    },
  }
);
