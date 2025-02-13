import { ButtonProps } from '../Button';

export interface ButtonGroupProps {
  children?: React.ReactNode;
  /**
   * Class name applied to the root element
   */
  className?: string;
  defaultProps?: ButtonProps;
  overridesProps?: ButtonProps;
}
