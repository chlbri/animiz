import type { ThemeColors } from './../themes';

export type Events = { type: 'CHANGE_THEME'; theme: ThemeColors };

export type Context = {
  ui: {
    colors: ThemeColors;
    components: {};
  };
  cache: {};
};

export type Services = {
  hydration: { data: any };
};
