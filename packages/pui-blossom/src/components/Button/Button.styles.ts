import { css } from '@emotion/css';

import { getPxSize } from '../../utils';

import { ButtonProps } from './Button.types';

export enum Colors {
  SemitransparentBlack05 = 'rgba(0, 0, 0, 0.05)',
  SemitransparentBlack10 = 'rgba(0, 0, 0, 0.1)',
  SemitransparentBlack15 = 'rgba(0, 0, 0, 0.15)',
}

export const getClassName = ({ scale: s = 1 }: ButtonProps) => {
  return css`
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getPxSize(14, s)};
  `;
};
