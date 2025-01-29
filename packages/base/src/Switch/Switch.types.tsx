import { CustomStyle, Slot } from '../types';

export interface SwitchCS {
  container?: CustomStyle;
  action?: CustomStyle;
  input?: CustomStyle;
  label?: CustomStyle;
  track?: CustomStyle;
  thumb?: CustomStyle;
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
  startDecorator?: React.ReactElement | string | number;
  endDecorator?: React.ReactElement | string | number;
  /**
   * Slots
   */
  slots?: {
    trackContent?: Slot;
    label?: Partial<Slot>;
    startDecorator?: Slot;
    endDecorator?: Slot;
    thumb?: Partial<Slot>;
  };
  cs?: SwitchCS;
  /**
   * Provides the checked value as a callback's argument
   */
  onValueChange?: (checked: boolean) => void;
}
