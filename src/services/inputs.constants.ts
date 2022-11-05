export const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Mystery',
  'Psychological',
  'Ecchi',
  'Slice of Life',
  'Sci-Fi',
  'Mahou Shoujo',
  'Horror',
  'Sports',
  'Romance',
  'Mecha',
  'Supernatural',
  'Music',
  'Hentai',
  'Thriller',
] as const;

export const FORMATS = [
  'TV',
  'TV_SHORT',
  'MOVIE',
  'SPECIAL',
  'OVA',
  'ONA',
  'MUSIC',
  'MANGA',
  'NOVEL',
  'ONE_SHOT',
] as const;

export const COUNTRY_CODES = {
  JP: 'Japan',
  KR: 'South Korea',
  CN: 'China',
  TW: 'Taiwan',
} as const;

export const AIRING_STATUS = [
  'RELEASING',
  'FINISHED',
  'NOT_YET_RELEASED',
  'CANCELLED',
] as const;

export const THROTTLE_TIME = 1000;
