import { decompose, StateValue } from '@bemedev/decompose';

export type MatchOptions =
  | {
      or: MatchOptions[];
    }
  | { and: MatchOptions[] }
  | string;

function buildMatches(
  decomposeds: readonly string[],
  value: MatchOptions
): boolean {
  let out = false;
  if (typeof value === 'string') {
    out = decomposeds.includes(value);
  } else if ('or' in value) {
    const _values = value.or;
    out = _values
      .map((value) => buildMatches(decomposeds, value))
      .some((value) => value === true);
  } else {
    const _values = value.and;
    out = _values
      .map((value) => buildMatches(decomposeds, value))
      .every((value) => value === true);
  }

  return out;
}

export function matches(value: StateValue) {
  const decomposeds = decompose(value);
  return (...values: MatchOptions[]) => {
    const matchers = values.map((value) =>
      buildMatches(decomposeds, value)
    );
    return matchers.every((matcher) => matcher === true);
  };
}
