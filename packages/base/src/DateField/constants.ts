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
