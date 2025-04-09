import { CustomStyle, Slot } from '../types';

export interface RadioCS {
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

export interface RadioProps extends PickedInputHTMLAttributes {
  /**
   * Class name applied to the root element
   */
  className?: string;
  /**
   * Custom styles that overrides default styles
   */
  cs?: RadioCS;
  /**
   * Additional props for the input element
   */
  inputProps?: { ref: React.RefObject<HTMLInputElement> } & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    TopLevelInputHTMLAttributes | 'type'
  >;
  /**
   * The label element of the checkbox
   */
  label?: React.ReactNode;
  /**
   * Provides the checked value as a callback's argument
   */
  onValueChange?: (checked: boolean) => void;
  /**
   * Analog of a read-only attribute, which makes the element state not mutable
   * @default false
   */
  readOnlyState?: boolean;
  /**
   * Slots
   */
  slots?: {
    icon?: Slot;
    label?: Partial<Slot>;
  };
}
