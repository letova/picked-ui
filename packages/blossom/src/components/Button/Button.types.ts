import { CSSObject } from '@emotion/css';

import { ButtonProps as BaseButtonProps } from '../../../../base/src/components/Button';

export interface ButtonProps extends BaseButtonProps {
  scale?: number;
  customCss?: CSSObject;
}
