import { getPxSize } from '../../utils';

import { ButtonProps } from './Button.types';

export const getCS = ({ scale: s = 1, children, startDecorator, endDecorator }: ButtonProps): ButtonProps['cs'] => {
  const smallLeftPadding = startDecorator || (endDecorator && !children);
  const smallRightPadding = endDecorator || (startDecorator && !children);

  return {
    container: ({ disabled }) => ({
      display: 'flex',
      columnGap: getPxSize(4, s),
      alignItems: 'center',
      minHeight: getPxSize(32, s),
      padding: `${getPxSize(4, s)} ${getPxSize(smallRightPadding ? 8 : 16, s)} ${getPxSize(4, s)} ${getPxSize(
        smallLeftPadding ? 8 : 16,
        s,
      )}`,
      border: 'none',
      borderRadius: getPxSize(6, s),
      fontFamily: `'Arial', sans-serif`,
      fontWeight: 600,
      fontSize: getPxSize(14, s),
      background: 'gray',
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
    }),
  };
};
