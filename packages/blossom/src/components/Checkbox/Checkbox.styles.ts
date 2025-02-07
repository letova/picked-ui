import { deepMergeCS, getPxSize } from '../../utils';
import { Colors } from '../../constants';

import { CheckboxProps } from './Checkbox.types';
import { COLOR_MAP } from './Checkbox.palette';

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

export const getCS = ({
  variant = 'solid',
  scale: s = 1,
  size = 's',
  color = 'primary',
  cs,
}: CheckboxProps): CheckboxProps['cs'] => {
  const sizes = SIZES_MAP[size];
  const colors = COLOR_MAP[variant][color];

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
      inputContainer: ({ disabled, focusVisible }) => ({
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        border: `${getPxSize(IC_BORDER_SIZE, s)} solid ${disabled ? colors.border.disabled : colors.border.normal}`,
        borderRadius: getPxSize(3, s),
        backgroundColor: disabled ? colors.bg.disabled : colors.bg.normal,

        '&:hover': {
          backgroundColor: disabled ? colors.bg.disabled : colors.bg.hover,
        },

        '&:active': {
          backgroundColor: disabled ? colors.bg.disabled : colors.bg.active,
        },

        ...(focusVisible
          ? { outline: `${getPxSize(2, s)} solid ${Colors.Primary600}`, outlineOffset: getPxSize(2, s) }
          : undefined),
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
      icon: ({ disabled }) => ({
        width: getPxSize(sizes.boxSize, s),
        height: getPxSize(sizes.boxSize, s),
        fill: disabled ? colors.text.disabled : colors.text.normal,
      }),
      label: ({ disabled }) => ({
        fontSize: getPxSize(sizes.fontSize, s),
        fontWeight: 400,
        color: disabled ? Colors.Neutral400 : Colors.Black,
        // text-size-adjust: 100%, ???
      }),
    },
    cs,
  );
};
