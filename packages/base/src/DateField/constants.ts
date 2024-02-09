import { DateFieldSectionTypes } from './DateField.types';

export const TOKEN_TO_TYPE_MAP: Record<string, { type: DateFieldSectionTypes }> = {
  Y: { type: 'year' },
  M: { type: 'month' },
  D: { type: 'day' },
  d: { type: 'weekday' },
  H: { type: 'hour' },
  h: { type: 'hour' },
  m: { type: 'minute' },
  s: { type: 'second' },
  S: { type: 'fractionalSecond' },
  A: { type: 'dayPeriod' },
  a: { type: 'dayPeriod' },
  Z: { type: 'timeZoneName' },
};
