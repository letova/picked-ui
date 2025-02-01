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
  shape = 'round',
  children,
  startDecorator,
  endDecorator,
}: ButtonProps): ButtonProps['cs'] => {
  const smallLeftPadding = startDecorator || (endDecorator && !children);
  const smallRightPadding = endDecorator || (startDecorator && !children);

  const borderRadius = getBorderRadius(shape, 32);

  const colors = VARIANT_COLORS_MAP[variant];

  return {
    container: ({ pressed, disabled, focusVisible }) => ({
      display: 'flex',
      columnGap: getPxSize(6, s),
      alignItems: 'center',
      minHeight: getPxSize(32, s),
      padding: `${getPxSize(4, s)} ${getPxSize(smallRightPadding ? 8 : 16, s)} ${getPxSize(4, s)} ${getPxSize(
        smallLeftPadding ? 8 : 16,
        s,
      )}`,
      border: variant === 'outlined' ? `${getPxSize(1, s)} solid black` : 'none',
      borderRadius: getPxSize(borderRadius, s),
      boxSizing: 'border-box',
      fontFamily: `'Arial', sans-serif`,
      fontWeight: 600,
      fontSize: getPxSize(14, s),
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
