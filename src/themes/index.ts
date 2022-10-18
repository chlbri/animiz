import { DEFAULT } from './themes';
export * from './type';

const themes = {
  DEFAULT,
} as const;

export default themes;
export type Themes = typeof themes;
export type ThemeKey = keyof Themes;
