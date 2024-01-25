import { CSSObject } from '@emotion/css';
import { PaperProps as BasePaperProps } from '@picked-ui/base';

export interface PaperProps extends BasePaperProps {
  scale?: number;
  customCss?: CSSObject;
  square?: boolean;
  outline?: boolean;
}
