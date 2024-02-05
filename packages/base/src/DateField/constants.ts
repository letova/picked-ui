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

const initGetValue = (options: Intl.DateTimeFormatOptions) => (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', options).format(date);

export const DATE_TIME_FORMAT_MAP = {
  // Year
  YY: { type: 'year', getValue: initGetValue({ year: '2-digit' }) },
  YYYY: { type: 'year', getValue: initGetValue({ year: 'numeric' }) },
  // Month
  M: { type: 'month', getValue: initGetValue({ month: 'numeric' }) },
  MM: { type: 'month', getValue: initGetValue({ month: '2-digit' }) },
  MMM: { type: 'month', getValue: initGetValue({ month: 'short' }) },
  MMMM: { type: 'month', getValue: initGetValue({ month: 'long' }) },
  // Day of Month
  D: { type: 'day', getValue: initGetValue({ day: 'numeric' }) },
  Do: { type: 'day', getValue: initGetValue({ day: '2-digit' }) }, // todo: fix this
  DD: { type: 'day', getValue: initGetValue({ day: '2-digit' }) },
  // Day of Week
  d: { type: 'weekday', getValue: initGetValue({ weekday: 'narrow' }) }, // todo: fix this
  ddd: { type: 'weekday', getValue: initGetValue({ weekday: 'short' }) },
  dddd: { type: 'weekday', getValue: initGetValue({ weekday: 'long' }) },
  // Hour
  H: { type: 'hour', getValue: initGetValue({ hour: 'numeric' }) },
  HH: { type: 'hour', getValue: initGetValue({ hour: '2-digit' }) },
  h: { type: 'hour', getValue: initGetValue({ hour: 'numeric', hour12: true }) },
  hh: { type: 'hour', getValue: initGetValue({ hour: '2-digit', hour12: true }) },
  // Minute
  m: { type: 'minute', getValue: initGetValue({ minute: 'numeric' }) },
  mm: { type: 'minute', getValue: initGetValue({ minute: '2-digit' }) },
  //Second
  s: { type: 'second', getValue: initGetValue({ second: 'numeric' }) },
  ss: { type: 'second', getValue: initGetValue({ second: '2-digit' }) },
  // Fractional Second
  S: { type: 'fractionalSecond', getValue: (date: Date) => date.getMilliseconds() },
  SS: { type: 'fractionalSecond', getValue: (date: Date) => date.getMilliseconds() },
  SSS: { type: 'fractionalSecond', getValue: (date: Date) => date.getMilliseconds() },
  // AM / PM
  A: { type: 'dayPeriod', getValue: initGetValue({ hour: 'numeric', hour12: true }) }, // todo: split
  a: { type: 'dayPeriod', getValue: initGetValue({ hour: 'numeric', hour12: true }) }, // todo: split & lowercase
  // Timezone
  Z: { type: 'timeZoneName' },
  ZZ: { type: 'timeZoneName' },
};
