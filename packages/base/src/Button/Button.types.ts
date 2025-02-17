import { CustomStyle, Slot } from '../types';

type OmitedButtonHTMLAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref' | 'children'>;

export interface ButtonCS {
  container?: CustomStyle;
}

export interface ButtonProps extends OmitedButtonHTMLAttributes {
  /**
   * Button content. You can use text or the <Any /> element.
   */
  children?: React.ReactNode;
  /**
   * Custom styles that overrides default styles
   */
  cs?: ButtonCS;
  /**
   * A reserved subspace to store options and values for customized functionality
   */
  custom?: Record<string, unknown>;
  /**
   * Element placed after the children
   */
  endDecorator?: React.ReactElement | string | number;
  /**
   * Toggles the pressed state
   * Aria-pressed
   */
  pressed?: boolean;
  /**
   * Components that renders each slot inside
   */
  slots?: {
    startDecorator?: Slot;
    endDecorator?: Slot;
  };
  /**
   * Element placed before the children
   */
  startDecorator?: React.ReactElement | string | number;
}
