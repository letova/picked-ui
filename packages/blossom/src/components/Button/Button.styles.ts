import { Colors } from '../../constants';
import { getPxSize } from '../../utils';

import { ButtonProps } from './Button.types';

const VARIANT_COLORS_MAP = {
  soft: {
    bg: {
      normal: 'lightgray',
      hover: 'darkgray',
      active: 'dimgray',
      pressed: 'dimgray',
      disabled: 'lightgray',
    },
    text: 'white',
  },
  solid: {
    bg: {
      normal: 'gray',
      hover: 'darkgray',
      active: 'dimgray',
      pressed: 'dimgray',
      disabled: 'lightgray',
    },
    text: 'white',
  },
  outlined: {
    bg: {
      normal: 'transparent',
      hover: 'darkgray',
      active: 'dimgray',
      pressed: 'dimgray',
      disabled: 'lightgray',
    },
    text: 'black',
  },
};

const SIZES_MAP = {
  xs: {
    minHeight: 28,
    paddingX: { small: 6, normal: 12 },
    paddingY: 2,
    fontSize: 12,
  },
  s: {
    minHeight: 32,
    paddingX: { small: 8, normal: 16 },
    paddingY: 4,
    fontSize: 14,
  },
  m: {
    minHeight: 36,
    paddingX: { small: 10, normal: 20 },
    paddingY: 6,
    fontSize: 16,
  },
};

const getBorderRadius = (shape: ButtonProps['shape'], height: number) => {
  switch (shape) {
    case 'brick': {
      return 0;
    }

    case 'round': {
      return 6;
    }

    case 'fully-round': {
      return height;
    }

    default:
      return 0;
  }
};

export const getCS = ({
  variant = 'solid',
  scale: s = 1,
  size = 's',
  shape = 'round',
  children,
  startDecorator,
  endDecorator,
}: ButtonProps): ButtonProps['cs'] => {
  const smallLeftPadding = startDecorator || (endDecorator && !children);
  const smallRightPadding = endDecorator || (startDecorator && !children);

  const borderRadius = getBorderRadius(shape, 32);

  const colors = VARIANT_COLORS_MAP[variant];
  const sizes = SIZES_MAP[size];

  return {
    container: ({ pressed, disabled, focusVisible }) => ({
      display: 'flex',
      columnGap: getPxSize(6, s),
      alignItems: 'center',
      minHeight: getPxSize(sizes.minHeight, s),
      padding: `${getPxSize(sizes.paddingY, s)} ${getPxSize(
        smallRightPadding ? sizes.paddingX.small : sizes.paddingX.normal,
        s,
      )} ${getPxSize(sizes.paddingY, s)} ${getPxSize(
        smallLeftPadding ? sizes.paddingX.small : sizes.paddingX.normal,
        s,
      )}`,
      border: variant === 'outlined' ? `${getPxSize(1, s)} solid black` : 'none',
      borderRadius: getPxSize(borderRadius, s),
      boxSizing: 'border-box',
      fontFamily: `'Arial', sans-serif`,
      fontWeight: 600,
      fontSize: getPxSize(sizes.fontSize, s),
      background: pressed ? colors.bg.pressed : colors.bg.normal,
      color: colors.text,
      cursor: disabled ? 'default' : 'pointer',

      '&:hover': {
        background: colors.bg.hover,
      },
      '&:active': {
        background: colors.bg.active,
      },
      '&:disabled': {
        background: colors.bg.disabled,
      },

      ...(focusVisible
        ? { outline: `${getPxSize(2, s)} solid ${Colors.ScienceBlue}`, outlineOffset: getPxSize(2, s) }
        : undefined),
    }),
  };
};
