import { CSSObject } from '@emotion/css';

export interface CustomStyles {
  container?: CSSObject;
  label?: CSSObject;
}

type PickedInputHTMLAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange' | 'onFocus' | 'onBlur'
>;

export interface CheckboxProps extends PickedInputHTMLAttributes {
  className?: string;
  label?: React.ReactNode;
  cs?: CustomStyles;
  indeterminate?: boolean;
  // autoFocus?: boolean;
}
