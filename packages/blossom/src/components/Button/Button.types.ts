import { CSSObject } from '@emotion/css';
import { ButtonProps as BaseButtonProps } from '@picked-ui/base';

export interface ButtonProps extends BaseButtonProps {
  scale?: number;
  customCss?: CSSObject;
}
