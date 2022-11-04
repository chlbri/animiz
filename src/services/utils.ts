import type { COUNTRY_CODES } from "./constants";

export function isBrowser() {
  return typeof window !== `undefined`;
}


