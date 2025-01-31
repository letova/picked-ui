import { deepMergeCS, getPxSize } from '../../utils';

import { LoaderProps } from './Loader.types';

export const getCS = ({
  // variant = 'circle',
  scale: s = 1,
  cs,
}: LoaderProps): LoaderProps['cs'] => {
  return deepMergeCS(
    {
      container: {
        display: 'inline-block',
      },
      progress: {
        display: 'inline-block',
        width: getPxSize(32, s),
        height: getPxSize(32, s),

        border: `${getPxSize(2, s)} solid dimgray`,
        borderBottom: 'white',
        borderRadius: '50%',
        boxSizing: 'border-box',

        animation: 'rotation 1s linear infinite',

        '&::before, &::after': {
          display: 'none',
          animation: 'none',
        },

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
