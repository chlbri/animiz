import { en } from './en';
import { fr } from './fr';

const langs = {
  en,
  fr,
} as const;

export type Langs = typeof langs;
export type LangKey = keyof typeof langs;
export type Lang = Langs[LangKey];

export default langs;
