import { CSSObject } from '@emotion/css';

export interface CheckboxCS {
  container?: CSSObject;
  label?: CSSObject;
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
  cs?: CheckboxCS;
  /**
   * Additional third state known as partially checked
   */
  indeterminate?: boolean;
}
