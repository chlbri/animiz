import { assign, createMachine } from 'xstate';
import { z } from 'zod';
import data from '../../public/json/data.json';
import extractParams from './extractParams.machine';
import type { AiringStatus, CountryKey } from './inputs.types';
import { QueryFilter, queryFilterSchema } from './urlBuilder.machine';

export const artSchema = queryFilterSchema
  .omit({
    airingStatus: true,
    country: true,
  })
  .extend({
    airingStatus: queryFilterSchema.shape.airingStatus.unwrap().unwrap(),
    country: queryFilterSchema.shape.country.unwrap().unwrap(),
    title: z.string(),
    description: z.string().optional(),
    src: z.string().optional(),
    color: z.string().optional(),
    id: z.string().optional(),
  });

export type Art = z.infer<typeof artSchema>;

export const contextSchema = queryFilterSchema.extend({
  arts: artSchema.array().optional(),
  params: z.custom<URLSearchParams>().optional(),
});

export type Context = z.infer<typeof contextSchema>;
export type Events = { type: 'ASSIGN_URL'; url: URL };

export const filterMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./filter.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as {
        extractParams: { data: QueryFilter };
      },
    },

    initial: 'idle',
    states: {
      idle: {
        always: {
          actions: ['extractParams', 'initialize'],
          target: 'params',
        },
        on: {
          ASSIGN_URL: {
            target: 'extraction',
          },
        },
      },
      extraction: {
        entry: ['wakeExtractParams'],
        invoke: {
          src: 'extractParams',
          onDone: {
            target: 'params',
            actions: ['extractParams'],
          },
        },
        exit: ['initialize'],
      },
      params: {
        initial: 'text',
        states: {
          text: {
            always: [
              {
                cond: 'hasText',
                actions: ['filterText'],
                target: 'year',
              },
              'year',
            ],
          },
          year: {
            always: [
              {
                cond: 'hasYear',
                actions: ['filterYear'],
                target: 'genres',
              },
              'genres',
            ],
          },
          genres: {
            always: [
              {
                cond: 'hasGenres',
                actions: ['filterGenres'],
                target: 'format',
              },
              'format',
            ],
          },
          format: {
            always: [
              {
                cond: 'hasFormat',
                actions: ['filterFormat'],
                target: 'airingStatus',
              },
              'airingStatus',
            ],
          },
          airingStatus: {
            always: [
              {
                cond: 'hasAiringStatus',
                actions: ['filterAiringStatus'],
                target: 'country',
              },
              'country',
            ],
          },
          country: {
            always: [
              {
                cond: 'hasCountry',
                actions: ['filterCountry'],
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
        data: ({ arts }) => arts,
      },
    },
  },
  {
    actions: {
      //TODO: Transform to service
      extractParams: assign({
        airingStatus: ({ params }) => {
          return params?.get('airingStatus') as AiringStatus;
        },
        year: ({ params }) => params?.get('year'),
        format: ({ params }) => params.get('format'),
        text: ({ params }) => params.get('text'),
        country: ({ params }) => {
          return params.get('country') as CountryKey;
        },
        genres: ({ params }) => {
          const _genres = params.get('genres');
          if (!_genres) return;
          return JSON.parse(_genres) /* as string[] */;
        },
      }),

      filterAiringStatus: assign({
        arts: ({ arts, airingStatus }) => {
          return arts?.filter((val) => val.airingStatus === airingStatus);
        },
      }),

      filterCountry: assign({
        arts: ({ arts, country }) => {
          return arts?.filter((val) => val.country === country);
        },
      }),

      filterFormat: assign({
        arts: ({ arts, format }) => {
          return arts?.filter((val) => val.format === format);
        },
      }),

      filterText: assign({
        arts: ({ arts, text }) => {
          return arts?.filter((val) => val.title.includes(text!));
        },
      }),

      filterYear: assign({
        arts: ({ arts, year }) => {
          return arts?.filter((val) => {
            const yearNumber = val.year;
            if (!yearNumber) return false;
            return '' + val.year === year;
          });
        },
      }),

      filterGenres: assign({
        arts: ({ arts, genres }) => {
          const _genres = genres!;
          return arts?.filter(
            ({ genres }) =>
              !!genres && genres?.some((val) => _genres.includes(val))
          );
        },
      }),

      initialize: assign({
        arts: (_) =>
          data.map((val) => ({
            ...val,
            airingStatus: val.status,
          })) as Art[],
      }),
    },
    guards: {
      hasAiringStatus: ({ airingStatus }) => !!airingStatus,
      hasCountry: ({ country }) => !!country,
      hasFormat: ({ format }) => !!format,
      hasText: ({ text }) => !!text,
      hasYear: ({ year }) => !!year,
      hasGenres: ({ genres }) => !!genres && genres.length > 0,
    },
    services: {
      extractParams,
    },
  }
);
