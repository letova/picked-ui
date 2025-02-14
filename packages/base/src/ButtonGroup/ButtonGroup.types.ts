import { ButtonProps } from '../Button';

export interface ButtonGroupCustom {
  defaultProps?: ButtonProps;
  overridesProps?: ButtonProps;
}

export type ButtonGroupComponent = ((
  p: ButtonGroupProps & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement) & {
  Button: React.FC<ButtonProps>;
};

export interface ButtonGroupProps {
  children?: React.ReactNode;
  /**
   * Class name applied to the root element
   */
  className?: string;
  defaultProps?: ButtonProps;
  overridesProps?: ButtonProps;
}
