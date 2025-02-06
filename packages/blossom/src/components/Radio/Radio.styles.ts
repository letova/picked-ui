import { CSSObject } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';
import { Colors } from '../../constants';

import { VARIANT_PALETTE_FOR_DISABLED_MAP, VARIANT_PALETTE_MAP } from './Radio.palettes';
import { RadioProps } from './Radio.types';

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

const IC_BORDER_SIZE = 1;

export const getCheckedRadioIconStyle = ({ scale: s = 1, size = 's' }: RadioProps): CSSObject => {
  const sizes = SIZES_MAP[size];

  return {
    display: 'inline-block',
    width: getPxSize(sizes.boxSize - 8, s),
    height: getPxSize(sizes.boxSize - 8, s),
    borderRadius: '50%',
    background: 'black',
  };
};

export const getCS = ({
  variant = 'solid',
  scale: s = 1,
  size = 's',
  color = 'primary',
  cs,
}: RadioProps): RadioProps['cs'] => {
  const sizes = SIZES_MAP[size];

  const paletteMap = VARIANT_PALETTE_MAP[variant];
  const palette = paletteMap[color];
  const disabledPalette = VARIANT_PALETTE_FOR_DISABLED_MAP[variant];

  return deepMergeCS(
    {
      container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: getPxSize(8, s),
        boxSizing: 'border-box',
        fontFamily: `'Arial', sans-serif`,
        fontWeight: 400,
        fontSize: getPxSize(14, s),
        '& *': {
          boxSizing: 'inherit',
        },
      },
      inputContainer: ({ disabled, focusVisible }) => ({
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        border: `${getPxSize(IC_BORDER_SIZE, s)} solid ${disabled ? disabledPalette.border : palette.border.normal}`,
        borderRadius: '50%',
        backgroundColor: disabled ? disabledPalette.bg : palette.bg.normal,

        '&:hover': {
          backgroundColor: disabled ? disabledPalette.bg : palette.bg.hover,
        },

        '&:active': {
          backgroundColor: disabled ? disabledPalette.bg : palette.bg.active,
        },

        ...(focusVisible
          ? { outline: `${getPxSize(2, s)} solid ${Colors.Primary600}`, outlineOffset: getPxSize(2, s) }
          : undefined),
      }),
      action: {
        position: 'absolute',
        top: getPxSize(-IC_BORDER_SIZE, s),
        left: getPxSize(-IC_BORDER_SIZE, s),
        width: `calc(100% + ${getPxSize(IC_BORDER_SIZE, s)})`,
        height: `calc(100% + ${getPxSize(IC_BORDER_SIZE, s)})`,
      },
      input: {
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        opacity: 0,
        cursor: 'pointer',
      },
      icon: ({ disabled }) => ({
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        fill: disabled ? disabledPalette.text : palette.text.normal,
      }),
      label: ({ disabled }) => ({
        fontSize: getPxSize(sizes.fontSize, s),
        fontWeight: 400,
        color: disabled ? Colors.Neutral400 : Colors.Black,
      }),
    },
    cs,
  );
};
