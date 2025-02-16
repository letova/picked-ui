import { getPxSize } from '../../utils';

import { ButtonGroupProps } from './ButtonGroup.types';

const MIDDLE_CHILD_STYLE = {
  '--Button-top-left-radius': 0,
  '--Button-top-right-radius': 0,
  '--Button-bottom-left-radius': 0,
  '--Button-bottom-right-radius': 0,
};

export const getCS = ({
  defaultProps,
  orientation = 'horizontal',
  scale: s = 1,
  spacing = 1,
}: ButtonGroupProps): ButtonGroupProps['cs'] => {
  const { variant } = defaultProps || {};

  const connectedStyle =
    variant && variant === 'outlined' && spacing === 0
      ? {
          [`& > :not(:first-child)`]: {
            marginLeft: getPxSize(-1, s),
          },
        }
      : undefined;

  if (orientation === 'horizontal') {
    return {
      container: {
        display: 'flex',
        columnGap: getPxSize(spacing, s),

        [`& > [data-first-child]:not(:only-child)`]: {
          '--Button-top-right-radius': 0,
          '--Button-bottom-right-radius': 0,
        },
        [`& > :not([data-first-child]):not([data-last-child]):not(:only-child)`]: MIDDLE_CHILD_STYLE,
        [`& > [data-last-child]:not(:only-child)`]: {
          '--Button-top-left-radius': 0,
          '--Button-bottom-left-radius': 0,
        },

        ...connectedStyle,
      },
    };
  }

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: getPxSize(spacing, s),

      [`& > [data-first-child]:not(:only-child)`]: {
        '--Button-bottom-left-radius': 0,
        '--Button-bottom-right-radius': 0,
      },
      [`& > :not([data-first-child]):not([data-last-child]):not(:only-child)`]: MIDDLE_CHILD_STYLE,
      [`& > [data-last-child]:not(:only-child)`]: {
        '--Button-top-left-radius': 0,
        '--Button-top-right-radius': 0,
      },

      ...connectedStyle,
    },
  };
};
