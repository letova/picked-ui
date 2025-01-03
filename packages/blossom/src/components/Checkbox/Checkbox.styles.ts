import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';

import { CheckboxProps } from './Checkbox.types';

const SIZES_MAP = {
  xs: {
    boxSize: 14,
    fontSize: 12,
  },
  s: {
    boxSize: 16,
    fontSize: 14,
  },
  m: {
    boxSize: 18,
    fontSize: 16,
  },
};

export const getClassName = ({ scale: s = 1 }: CheckboxProps) => {
  return css`
    display: flex;
    align-items: center;
    gap: ${getPxSize(6, s)};
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getPxSize(14, s)};
  `;
};

export const getCS = ({ scale: s = 1, size = 's', cs }: CheckboxProps): CheckboxProps['cs'] => {
  const sizes = SIZES_MAP[size];

  return deepMergeCS(
    {
      inputContainer: {
        flexShrink: 0,
        display: 'block',
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        border: `${getPxSize(1, s)} solid lightgray`,
        borderRadius: getPxSize(3, s),
      },
      input: {
        position: 'absolute',
        backgroundColor: 'transparent',
        opacity: 0,
      },
      icon: {
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
      },
      label: {
        fontSize: getPxSize(sizes.fontSize, s),
        fontWeight: 400,
        // text-size-adjust: 100%, ???
      },
    },
    cs,
  );
};
