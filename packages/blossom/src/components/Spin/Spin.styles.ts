import { deepMergeCS, getPxSize } from '../../utils';

import { SpinProps } from './Spin.types';

const SIZES_MAP = {
  xs: 16,
  s: 24,
  m: 32,
  l: 40,
  xl: 48,
};

export const getCS = ({ scale: s = 1, size = 's', color = 'dimgray', cs }: SpinProps): SpinProps['cs'] => {
  const progressSize = typeof size === 'number' ? size : SIZES_MAP[size];

  return deepMergeCS(
    {
      container: {
        display: 'inline-block',
        boxSizing: 'border-box',
      },
      progress: {
        display: 'inline-block',
        width: getPxSize(progressSize, s),
        height: getPxSize(progressSize, s),

        border: `${getPxSize(2, s)} solid ${color}`,
        borderBottomColor: 'transparent',
        borderRadius: '50%',
        boxSizing: 'border-box',

        animation: 'rotation 1s linear infinite',

        '@keyframes rotation': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
    cs,
  );
};
