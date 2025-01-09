import { CSSObject } from '@emotion/css';

import { GetCSSObjectFn } from '../utils';

export interface SwitchCS {
  container?: CSSObject | GetCSSObjectFn;
  action?: CSSObject | GetCSSObjectFn;
  input?: CSSObject | GetCSSObjectFn;
  label?: CSSObject | GetCSSObjectFn;
  track?: CSSObject | GetCSSObjectFn;
  thumb?: CSSObject | GetCSSObjectFn;
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

export interface SwitchProps extends PickedInputHTMLAttributes {
  /**
   * Class name applied to the root element
   */
  className?: string;
  /**
   * The label element of the switch
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
    label?: { component: React.ElementType<any>; props?: Record<string, unknown> };
  };
  cs?: SwitchCS;
  /**
   * Provides the checked value as a callback's argument
   */
  onValueChange?: (checked: boolean) => void;
}
