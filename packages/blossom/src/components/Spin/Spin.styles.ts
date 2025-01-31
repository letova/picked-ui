import { deepMergeCS, getPxSize } from '../../utils';

import { SpinProps } from './Spin.types';

const SIZES_MAP = {
  xs: 24,
  s: 32,
  m: 40,
};

export const getCS = ({
  // variant = 'circle',
  scale: s = 1,
  size = 's',
  cs,
}: SpinProps): SpinProps['cs'] => {
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

        border: `${getPxSize(2, s)} solid dimgray`,
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
