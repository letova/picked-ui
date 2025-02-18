import { getPxSize } from '../../utils';
import { Colors } from '../../constants';

import { ButtonProps } from './Button.types';
import { COLOR_MAP } from './Button.palette';

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

const BORDER_SIZE = 1;

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
  color = 'primary',
  children,
  startDecorator,
  endDecorator,
}: ButtonProps): ButtonProps['cs'] => {
  const defaultBorderRadius = getPxSize(getBorderRadius(shape, 32), s);

  const colors = COLOR_MAP[variant][color];
  const sizes = SIZES_MAP[size];

  const smallLeftPadding = startDecorator || (endDecorator && !children);
  const smallRightPadding = endDecorator || (startDecorator && !children);
  const paddingSubtract = variant === 'outlined' ? BORDER_SIZE : 0;

  const rightPadding = smallRightPadding ? sizes.paddingX.small : sizes.paddingX.normal;
  const leftPadding = smallLeftPadding ? sizes.paddingX.small : sizes.paddingX.normal;

  const padding = {
    top: sizes.paddingY - paddingSubtract,
    bottom: sizes.paddingY - paddingSubtract,
    left: leftPadding - paddingSubtract,
    right: rightPadding - paddingSubtract,
  };

  return {
    container: ({ pressed, disabled, focusVisible }) => ({
      display: 'flex',
      columnGap: getPxSize(6, s),
      alignItems: 'center',
      minHeight: getPxSize(sizes.minHeight, s),
      padding: `${getPxSize(padding.top, s)} ${getPxSize(padding.right, s)} ${getPxSize(padding.bottom, s)} ${getPxSize(
        padding.left,
        s,
      )}`,
      border: variant === 'outlined' ? `${getPxSize(1, s)} solid ${colors.border.normal}` : 'none',
      borderRadius: `var(--Button-top-left-radius, ${defaultBorderRadius}) var(--Button-top-right-radius, ${defaultBorderRadius}) var(--Button-bottom-right-radius, ${defaultBorderRadius}) var(--Button-bottom-left-radius, ${defaultBorderRadius})`,
      boxSizing: 'border-box',
      fontFamily: `'Arial', sans-serif`,
      fontWeight: 600,
      fontSize: getPxSize(sizes.fontSize, s),
      background: pressed ? colors.bg.pressed : colors.bg.normal,
      color: disabled ? colors.text.disabled : colors.text.normal,
      cursor: disabled ? 'default' : 'pointer',

      '&:hover': {
        background: colors.bg.hover,
      },
      '&:active': {
        background: colors.bg.active,
      },
      '&:disabled': {
        background: colors.bg.disabled,
        borderColor: colors.border.disabled,
      },

      ...(focusVisible
        ? { outline: `${getPxSize(2, s)} solid ${Colors.Primary600}`, outlineOffset: getPxSize(2, s) }
        : undefined),
    }),
  };
};
