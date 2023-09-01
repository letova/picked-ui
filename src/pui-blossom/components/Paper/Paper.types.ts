import { CSSObject } from '@emotion/css';

import { PaperProps as BasePaperProps } from '../../../pui-base/components/Paper';

export interface PaperProps extends BasePaperProps {
  customCss?: CSSObject;
  square?: boolean;
  outline?: boolean;
}
