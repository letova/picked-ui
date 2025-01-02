import { CSSObject } from '@emotion/css';
import { CheckboxProps as BaseCheckboxProps } from '@picked-ui/base';

export type CheckboxIconProps = Pick<BaseCheckboxProps, 'className' | 'checked' | 'indeterminate'>;

export interface CheckboxProps extends BaseCheckboxProps {
  checkedIcon?: React.ReactNode;
  color?: 'base' | 'neutral' | 'danger' | 'success' | 'warning';
  customCss?: CSSObject;
  indeterminateIcon?: React.ReactNode;
  scale?: number;
  size?: 'xs' | 's' | 'm';
  uncheckedIcon?: React.ReactNode;
  variant?: 'solid' | 'soft' | 'outlined';
}
