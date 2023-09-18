import { CSSObject } from '@emotion/css';

export interface CustomStyles {
  container?: CSSObject;
  label?: CSSObject;
}

export interface CheckboxProps {
  className?: string;
  children?: React.ReactNode;
  cs?: CustomStyles;
  indeterminate?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
