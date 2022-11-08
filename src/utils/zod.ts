import { z } from 'zod';

export type Tarray<T extends z.Primitive> = readonly [T, T, ...T[]];
export type ZodTarray<T extends z.Primitive> = [
  z.ZodLiteral<T>,
  z.ZodLiteral<T>,
  ...z.ZodLiteral<T>[]
];

export function createZodStringLiterals<T extends z.Primitive>(
  ...values: Tarray<T>
) {
  return z.union(values.map((value) => z.literal(value)) as ZodTarray<T>);
}
