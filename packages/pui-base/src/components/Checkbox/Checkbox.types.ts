import { CSSObject } from '@emotion/css';

export interface CustomStyles {
  container?: CSSObject;
  label?: CSSObject;
}

type PickedInputHTMLAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'disabled' | 'onChange' | 'onFocus' | 'onBlur'
>;

export interface CheckboxProps extends PickedInputHTMLAttributes {
  className?: string;
  children?: React.ReactNode;
  cs?: CustomStyles;
  indeterminate?: boolean;
  defaultChecked?: boolean;
}
