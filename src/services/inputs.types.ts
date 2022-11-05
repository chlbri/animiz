import type {
  AIRING_STATUS,
  COUNTRY_CODES,
  FORMATS,
  GENRES,
} from './inputs.constants';

export type Genre = typeof GENRES[number];
export type Format = typeof FORMATS[number];
export type CountryCodes = typeof COUNTRY_CODES;
export type CountryKey = keyof CountryCodes;
export type CountryValue = CountryCodes[CountryKey];
export type AiringStatus = typeof AIRING_STATUS[number];

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

export type Events =
  | { type: 'INPUTS'; inputs: Inputs }
  | { type: '__RESET__' };
