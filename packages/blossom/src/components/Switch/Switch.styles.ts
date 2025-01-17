import { deepMergeCS, getPxSize } from '../../utils';
import { Colors } from '../../constants';

import { SwitchProps } from './Switch.types';

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

export const getCS = ({ scale: s = 1, size = 's', cs }: SwitchProps): SwitchProps['cs'] => {
  const sizes = SIZES_MAP[size];

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
      track: {
        position: 'relative',
        width: getPxSize(40, s),
        height: getPxSize(24, s),
        borderRadius: getPxSize(18, s),
        background: 'lightgray',
      },
      thumb: ({ checked }) => ({
        position: 'absolute',
        top: '50%',
        width: getPxSize(20, s),
        height: getPxSize(20, s),
        background: 'white',
        pointerEvents: 'none',
        transition: `left 0.25s ease`,
        transform: 'translateY(-50%)',
        borderRadius: '100%',
        ...(checked ? { right: getPxSize(2, s) } : { left: getPxSize(2, s) }),
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
      label: ({ disabled }) => ({
        fontSize: getPxSize(sizes.fontSize, s),
        fontWeight: 400,
        color: disabled ? Colors.Nobel : Colors.Black,
      }),
    },
    cs,
  );
};
