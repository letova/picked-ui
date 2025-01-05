import { deepMergeCS, getPxSize } from '../../utils';

import { VARIANT_PALETTE_MAP } from './Checkbox.palettes';
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

export const getCS = ({
  variant = 'solid',
  scale: s = 1,
  size = 's',
  color = 'primary',
  cs,
}: CheckboxProps): CheckboxProps['cs'] => {
  const sizes = SIZES_MAP[size];

  const paletteMap = VARIANT_PALETTE_MAP[variant];
  const palette = paletteMap[color];

  return deepMergeCS(
    {
      container: {
        display: 'flex',
        alignItems: 'center',
        gap: getPxSize(8, s),
        fontFamily: `'Arial', sans-serif`,
        fontWeight: 400,
        fontSize: getPxSize(14, s),
      },
      inputContainer: ({ focusVisible }) => ({
        flexShrink: 0,
        display: 'block',
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        border: `${getPxSize(1, s)} solid ${palette.border.normal}`,
        borderRadius: getPxSize(3, s),
        backgroundColor: palette.bg.normal,

        '&:hover': {
          backgroundColor: palette.bg.hover,
        },

        '&:active': {
          backgroundColor: palette.bg.active,
        },

        ...(focusVisible ? { outline: `${getPxSize(2, s)} solid ${palette.bg.normal}` } : undefined),
      }),
      input: {
        position: 'absolute',
        margin: 0,
        backgroundColor: 'transparent',
        opacity: 0,
        cursor: 'pointer',
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
