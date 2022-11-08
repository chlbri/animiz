import { assign } from '@xstate/immer';
import { assign as assignX, createMachine } from 'xstate';
import { z } from 'zod';
import {
  airingStatusSchema,
  countryKeySchema,
  formatSchema,
  genreSchema,
} from './inputs.types';
import type {
  ActionKeyFromMachine,
  GuardKeyFromMachine,
} from './utils/machine/test/types';

export const DEFAULT_HOST = 'localhost:3000/api/mangas.json';

export const queryFilterSchema = z.object({
  text: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
  format: formatSchema.nullable().optional(),
  airingStatus: airingStatusSchema.nullable().optional(),
  country: countryKeySchema.nullable().optional(),
  genres: genreSchema.array().nullable().optional(),
});

export type QueryFilter = z.infer<typeof queryFilterSchema>;

export type Context = QueryFilter & { url?: URL; host?: string };
export type Events = { type: 'QUERY' } & QueryFilter;

const checkValue = <T extends (string | null | undefined)[]>(
  ...values: T
) => {
  return values.every((value) => !!value && value !== '');
};

export const urlBuilderMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./urlBuilder.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },

    context: {},

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
                target: 'genres',
              },
              'genres',
            ],
          },
          genres: {
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
      addAiringStatus: assign((context) => {
        context.url!.searchParams.append(
          'airingStatus',
          context.airingStatus!
        );
      }),

      addCountry: assign((context) => {
        context.url!.searchParams.append('country', context.country!);
      }),

      addFormat: assign((context) => {
        context.url!.searchParams.append('format', context.format!);
      }),

      addParams: assignX((_, { type, ...params }) => {
        return params;
      }),

      addText: assign((context) => {
        context.url!.searchParams.append('text', context.text!);
      }),

      addGenre: assign((context) => {
        context.url!.searchParams.append(
          'genres',
          JSON.stringify(context.genres!)
        );
      }),

      addYear: assign((context) => {
        context.url!.searchParams.append('year', context.year!);
      }),

      createURL: assign((context) => {
        context.host = context.host ?? DEFAULT_HOST;
        context.url = new URL(context.host);
      }),
    },
    guards: {
      hasAiringStatus: ({ airingStatus }) => checkValue(airingStatus),
      hasCountry: ({ country }) => checkValue(country),
      hasFormat: ({ format }) => checkValue(format),
      hasText: ({ text }) => checkValue(text),
      hasYear: ({ year }) => checkValue(year),
      hasGenre: ({ genres }) => !!genres && checkValue(...genres),
    },
  }
);

export type UrlBuilderMachine = typeof urlBuilderMachine;
export type ActionKey = ActionKeyFromMachine<UrlBuilderMachine>;
export type GuardKey = GuardKeyFromMachine<UrlBuilderMachine>;
