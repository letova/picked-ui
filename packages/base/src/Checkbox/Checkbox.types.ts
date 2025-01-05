import { CSSObject } from '@emotion/css';

import { GetCSSObjectFn } from '../utils';

export interface CheckboxCS {
  container?: CSSObject | GetCSSObjectFn;
  inputContainer?: CSSObject | GetCSSObjectFn;
  input?: CSSObject | GetCSSObjectFn;
  label?: CSSObject | GetCSSObjectFn;
  icon?: CSSObject | GetCSSObjectFn;
}

type TopLevelInputHTMLAttributes =
  | 'id'
  | 'name'
  | 'value'
  | 'checked'
  | 'defaultChecked'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'onChange'
  | 'onFocus'
  | 'onBlur';

type PickedInputHTMLAttributes = Pick<React.InputHTMLAttributes<HTMLInputElement>, TopLevelInputHTMLAttributes>;

export interface CheckboxProps extends PickedInputHTMLAttributes {
  /**
   * Class name applied to the root element
   */
  className?: string;
  /**
   * The label element of the checkbox
   */
  label?: React.ReactNode;
  /**
   * Additional props for the input element
   */
  inputProps?: { ref: React.RefObject<HTMLInputElement> } & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    TopLevelInputHTMLAttributes | 'type'
  >;
  /**
   * Slots
   */
  slots?: {
    icon?: { component: React.ElementType<any>; props?: Record<string, unknown> };
    label?: { component: React.ElementType<any>; props?: Record<string, unknown> };
  };
  cs?: CheckboxCS;
  /**
   * Additional third state known as partially checked.
   * This does not set the native input element to indeterminate.
   */
  indeterminate?: boolean;
}
