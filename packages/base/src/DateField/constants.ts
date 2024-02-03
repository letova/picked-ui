interface DateFieldSection {
  type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'literal';
  value: string;
  token?: string;
  startIndex: number;
  endIndex: number;
  contentType?: 'text' | 'numeric';
  dependsOn?: string;
}

export const VALUE = '10:55:18';

export const SECTIONS: DateFieldSection[] = [
  { type: 'hour', contentType: 'numeric', value: '10', token: 'HH', startIndex: 0, endIndex: 1 },
  { type: 'literal', value: ':', startIndex: 2, endIndex: 2 },
  { type: 'minute', contentType: 'numeric', value: '55', token: 'mm', startIndex: 3, endIndex: 4 },
  { type: 'literal', value: ':', startIndex: 5, endIndex: 5 },
  { type: 'second', contentType: 'numeric', value: '18', token: 'ss', startIndex: 6, endIndex: 7 },
];

export const SELECTABLE_SECTIONS = SECTIONS.filter((section) => section.type !== 'literal');

export const DATE_TIME_FORMAT_OPTIONS_MAP = {
  // Year
  YY: { month: '2-digit' },
  YYYY: { month: 'numeric' },
  // Month
  M: { month: 'numeric' },
  MM: { month: '2-digit' },
  MMM: { month: 'short' },
  MMMM: { month: 'long' },
  // Day of Month
  D: { day: 'numeric' },
  Do: { day: '2-digit' }, // ???
  DD: { day: '2-digit' },
  // Day of Week
  d: { weekday: 'narrow' }, // ???
  ddd: { weekday: 'short' },
  dddd: { weekday: 'long' },
  // Hour
  H: { hour: 'numeric' },
  HH: { hour: '2-digit' },
  h: { hour: 'numeric', hour12: true },
  hh: { hour: '2-digit', hour12: true },
  // Minute
  m: { minute: 'numeric' },
  mm: { minute: '2-digit' },
  //Second
  s: { second: 'numeric' },
  ss: { second: '2-digit' },
  // Fractional Second
  S: null,
  SS: null,
  SSS: null,
  // AM / PM
  A: { hour: 'numeric', hour12: true }, // split ???
  a: { hour: 'numeric', hour12: true }, // split & lowercase ???
  // Timezone
  Z: null,
  ZZ: null,
};
