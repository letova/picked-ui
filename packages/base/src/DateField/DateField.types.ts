import { DateTokenTypes } from '../date-utils';

export interface DateFieldSection {
  type: DateTokenTypes | 'literal';
  value: string;
  token: string;
  contentType: 'text' | 'numeric';
  startIndex: number;
  endIndex: number;
}

export interface DateFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: Date;
  maxValue?: Date;
  minValue?: Date;
  format?: string;
  onChange?: (date?: Date) => void;
}
