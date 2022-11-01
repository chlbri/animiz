import type {
  ClassProp,
  ClassValue,
} from 'class-variance-authority/dist/types';

type ConfigSchema = Record<string, Record<string, ClassValue>>;
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null;
};
export type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? ConfigVariants<T> & ClassProp
        : ClassProp)[];
    }
  : never;
