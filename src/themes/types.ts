export const COLORS = [
  'DEFAULT',
  'DEFAULT_DARK',
  'AVIATOR_LIGHT',
  'AVIATOR_DARK',
  'ANIME_LIGHT',
  'ANIME_DARK',
] as const;

export const SIZES = ['DEFAULT', 'SMALL', 'BIG'] as const;

export type ThemeColors = typeof COLORS[number];
export type ThemeSizes = typeof SIZES[number];
