import type { Lang, LangKey } from 'src/langs';
import type { Theme, ThemeKey } from 'src/themes';

export type Events =
  | { type: 'CHANGE_LANG'; theme: LangKey }
  | { type: 'CHANGE_THEME'; theme: ThemeKey }
  | { type: 'TOGGLE' };

export type Context = {
  langs: Lang;
  ui: {
    theme: Theme;
    components: {};
  };
  cache: {};
};

export type Services = {
  hydration: { data: any };
  lang: { data: Lang };
  theme: { data: Theme };
};
