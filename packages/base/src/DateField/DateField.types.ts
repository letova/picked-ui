export type DateFieldSectionTypes =
  | 'year'
  | 'month'
  | 'day'
  | 'weekday'
  | 'hour'
  | 'minute'
  | 'second'
  | 'fractionalSecond'
  | 'dayPeriod'
  | 'timeZoneName'
  | 'literal';

export interface DateFieldSection {
  type: DateFieldSectionTypes;
  value: string;
  token: string;
  contentType: 'text' | 'numeric';
  startIndex: number;
  endIndex: number;
}

export interface DateFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: Date;
  format?: string;
  onChange?: (date?: Date) => void;
}
