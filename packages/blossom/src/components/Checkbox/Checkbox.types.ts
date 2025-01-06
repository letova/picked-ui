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
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  disableIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  scale?: number;
  size?: 'xs' | 's' | 'm';
  uncheckedIcon?: React.ReactNode;
  variant?: 'solid' | 'soft' | 'outlined';
}
