import { Colors } from '../../constants';
import { getPxSize } from '../../utils';

import { ButtonProps } from './Button.types';

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
  scale: s = 1,
  shape = 'round',
  children,
  startDecorator,
  endDecorator,
}: ButtonProps): ButtonProps['cs'] => {
  const smallLeftPadding = startDecorator || (endDecorator && !children);
  const smallRightPadding = endDecorator || (startDecorator && !children);

  const borderRadius = getBorderRadius(shape, 32);

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
      border: 'none',
      borderRadius: getPxSize(borderRadius, s),
      boxSizing: 'border-box',
      fontFamily: `'Arial', sans-serif`,
      fontWeight: 600,
      fontSize: getPxSize(14, s),
      background: pressed ? 'dimgray' : 'gray',
      color: 'white',
      cursor: disabled ? 'default' : 'pointer',

      '&:hover': {
        background: 'darkgray',
      },
      '&:active': {
        background: 'dimgray',
      },
      '&:disabled': {
        background: 'lightgray',
      },

      ...(focusVisible
        ? { outline: `${getPxSize(2, s)} solid ${Colors.ScienceBlue}`, outlineOffset: getPxSize(2, s) }
        : undefined),
    }),
  };
};
