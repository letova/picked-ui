import { ButtonGroupProps as BaseButtonGroupProps } from '@picked-ui/base';

import { ButtonProps } from '../Button';

export interface ButtonGroupProps extends BaseButtonGroupProps {
  /**
   * Default button props
   */
  defaultProps?: ButtonProps;
  /**
   * The component orientation
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The scale of the component
   * @default 1
   */
  scale?: number;
  /**
   * Defines the space between button components
   * @default 1
   */
  spacing?: number;
}
