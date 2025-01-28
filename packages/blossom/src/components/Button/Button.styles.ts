import { getPxSize } from '../../utils';

import { ButtonProps } from './Button.types';

export const getCS = ({ scale: s = 1 }: ButtonProps): ButtonProps['cs'] => {
  return {
    container: ({ disabled }) => ({
      padding: `${getPxSize(4, s)} ${getPxSize(16, s)}`,
      border: 'none',
      borderRadius: getPxSize(6, s),
      fontFamily: `'Arial', sans-serif`,
      fontWeight: 600,
      fontSize: getPxSize(14, s),
      background: 'gray',
      color: 'white',
      cursor: disabled ? 'default' : 'pointer',
    }),
  };
};
