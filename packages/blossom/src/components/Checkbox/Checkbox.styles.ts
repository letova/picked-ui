import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';

import { CheckboxProps } from './Checkbox.types';

export const getClassName = ({ scale: s = 1 }: CheckboxProps) => {
  return css`
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getPxSize(14, s)};
  `;
};

export const getCS = ({ scale: s = 1, cs }: CheckboxProps): CheckboxProps['cs'] => {
  return deepMergeCS(
    {
      icon: {
        width: getPxSize(20, s),
        height: getPxSize(20, s),
      },
    },
    cs,
  );
};
