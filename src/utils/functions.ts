type Arr = readonly any[];

/**
 *
 * (Don't use on generic functions)
 */
export function reduceFuntion<U extends Arr, T extends Arr = Arr, R = any>(
  fn: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => fn(...headArgs, ...tailArgs);
}
