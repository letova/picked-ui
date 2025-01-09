import { CheckboxProps as BaseCheckboxProps } from '@picked-ui/base';

export type CheckboxIconProps = Pick<
  CheckboxProps,
  | 'className'
  | 'checked'
  | 'indeterminate'
  | 'disabled'
  | 'checkedIcon'
  | 'disableIcon'
  | 'indeterminateIcon'
  | 'uncheckedIcon'
>;

export interface CheckboxProps extends BaseCheckboxProps {
  /**
   * The icon when checked is true
   */
  checkedIcon?: React.ReactNode;
  /**
   * The color of the component
   * @default primary
   */
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  /**
   * The icon when disabled is true
   */
  disableIcon?: React.ReactNode;
  /**
   * The focus outline wraps target
   * @default input
   */
  focusOutlineWraps?: 'input' | 'full';
  /**
   * The icon when the component is indeterminate
   */
  indeterminateIcon?: React.ReactNode;
  /**
   * The scale of the component
   * @default 1
   */
  scale?: number;
  /**
   * The size of the component
   * @default s
   */
  size?: 'xs' | 's' | 'm';
  /**
   * The icon when checked is false
   */
  uncheckedIcon?: React.ReactNode;
  /**
   * The variant of the component
   * @default solid
   */
  variant?: 'soft' | 'solid' | 'outlined';
}
