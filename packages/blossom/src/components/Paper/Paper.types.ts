import { CSSObject } from '@emotion/css';

import { PaperProps as BasePaperProps } from '../../../../base/src/components/Paper';

export interface PaperProps extends BasePaperProps {
  scale?: number;
  customCss?: CSSObject;
  square?: boolean;
  outline?: boolean;
}
