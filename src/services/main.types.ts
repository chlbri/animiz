export type Events =
  | { type: 'CHANGE_THEME'; theme: string }
  | { type: 'TOGGLE' };

export type Context = {
  ui: {
    theme: string;
  };
};
