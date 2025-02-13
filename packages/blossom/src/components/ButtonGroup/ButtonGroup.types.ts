import { ButtonGroupProps as BaseButtonGroupProps } from '@picked-ui/base';

import { ButtonProps } from '../Button';

export interface ButtonGroupProps extends BaseButtonGroupProps {
  defaultProps?: ButtonProps;
  overridesProps?: ButtonProps;
}
