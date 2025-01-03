import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';
import { OUTLINED_PALETTE_MAP, SOLID_PALETTE_MAP } from './Checkbox.palettes';

import { CheckboxProps } from './Checkbox.types';

const SIZES_MAP = {
  xs: {
    boxSize: 12,
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
    gap: ${getPxSize(8, s)};
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getPxSize(14, s)};
  `;
};

export const getCS = ({
  variant = 'solid',
  scale: s = 1,
  size = 's',
  color = 'primary',
  cs,
}: CheckboxProps): CheckboxProps['cs'] => {
  const sizes = SIZES_MAP[size];

  const paletteSource = variant === 'solid' ? SOLID_PALETTE_MAP : OUTLINED_PALETTE_MAP;
  const palette = paletteSource[color];

  return deepMergeCS(
    {
      inputContainer: {
        flexShrink: 0,
        display: 'block',
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        border: `${getPxSize(1, s)} solid ${palette.border.normal}`,
        borderRadius: getPxSize(3, s),
        background: palette.bg.normal,
      },
      input: {
        position: 'absolute',
        backgroundColor: 'transparent',
        opacity: 0,
      },
      icon: {
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        fill: palette.text.normal,
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
