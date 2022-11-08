import type { TuplifyUnion } from '@bemedev/core';
import type { z } from 'zod';
import { createZodStringLiterals } from '~utils/zod';
import {
  AIRING_STATUS,
  COUNTRY_CODES,
  FORMATS,
  GENRES,
} from './inputs.constants';

export const formatSchema = createZodStringLiterals(...FORMATS);
export const airingStatusSchema = createZodStringLiterals(
  ...AIRING_STATUS
);

const keys = Object.keys(COUNTRY_CODES) as TuplifyUnion<CountryKey>;
export const countryKeySchema = createZodStringLiterals(...keys);
export const genreSchema = createZodStringLiterals(...GENRES);

export type Genre = z.infer<typeof genreSchema>;
export type Format = z.infer<typeof formatSchema>;
export type AiringStatus = z.infer<typeof airingStatusSchema>;
export type CountryCodes = typeof COUNTRY_CODES;
export type CountryKey = keyof CountryCodes;
export type CountryValue = CountryCodes[CountryKey];

export type Inputs = {
  text?: string;
  genres?: Genre[];
  year?: string;
  format?: Format;
  airingStatus?: AiringStatus;
  country?: CountryKey;
};

export type Context = {
  editing?: boolean;
  current?: Inputs;
  previous?: Inputs;
  hasParent?: boolean;
  name: string;
};

export type Events = { type: 'INPUTS'; inputs: Inputs };
