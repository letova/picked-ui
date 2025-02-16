import { ButtonProps } from '../Button';

import { CustomStyle } from '../types';

export interface ButtonGroupCustom {
  defaultProps?: ButtonProps;
}

export interface ButtonGroupCS {
  container?: CustomStyle;
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
  cs?: ButtonGroupCS;
}
