import { cva } from 'class-variance-authority';
import type { ClassValue } from 'class-variance-authority/dist/types';
import type { ThemeColors, ThemeSizes } from './types';
import type { Config } from './types.generated';

type Colors = {
  colors: Record<ThemeColors, string>;
};

type Size = {
  size: Record<ThemeSizes, string>;
};

export const cvaColors = (
  base?: ClassValue,
  config?: Config<Colors> | undefined
) => cva<Colors>(base, config);

export const cvaSize = (
  base?: ClassValue,
  config?: Config<Size> | undefined
) => cva<Size>(base, config);

export { cx } from 'class-variance-authority';
