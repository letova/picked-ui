import { CustomStyle, Slot } from '../types';

export interface CheckboxCS {
  container?: CustomStyle;
  inputContainer?: CustomStyle;
  action?: CustomStyle;
  input?: CustomStyle;
  label?: CustomStyle;
  icon?: CustomStyle;
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
    icon?: Slot;
    label?: Partial<Slot>;
  };
  cs?: CheckboxCS;
  /**
   * Additional third state known as partially checked.
   * This does not set the native input element to indeterminate.
   */
  indeterminate?: boolean;
  /**
   * Provides the checked value as a callback's argument
   */
  onValueChange?: (checked: boolean) => void;
}
