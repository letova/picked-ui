import { CSSObject } from '@emotion/css';

import { ButtonProps as BaseButtonProps } from '../../../../pui-base/src/components/Button';

export interface ButtonProps extends BaseButtonProps {
  scale?: number;
  customCss?: CSSObject;
}
