import { css } from '@emotion/css';

import { getPxSize } from '../../utils';

import { CheckboxProps } from './Checkbox.types';

export const getClassName = ({ scale: s = 1 }: CheckboxProps) => {
  return css`
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getPxSize(14, s)};
  `;
};
