import { deepMergeCS, getPxSize } from '../../utils';
import { Colors } from '../../constants';

import { SwitchProps } from './Switch.types';

const SIZES_MAP = {
  xs: {
    track: { width: 36, height: 20 },
    thumb: 16,
    gap: 6,
    label: 12,
  },
  s: {
    track: { width: 40, height: 22 },
    thumb: 18,
    gap: 8,
    label: 14,
  },
  m: {
    track: { width: 44, height: 24 },
    thumb: 20,
    gap: 10,
    label: 16,
  },
};

const IC_BORDER_SIZE = 1;

export const getCS = ({
  scale: s = 1,
  size = 's',
  trackWidth,
  trackHeight,
  thumbSize,
  cs,
}: SwitchProps): SwitchProps['cs'] => {
  const sizes = SIZES_MAP[size];

  return deepMergeCS(
    {
      container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: getPxSize(sizes.gap, s),
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: getPxSize(trackWidth ?? sizes.track.width, s),
        height: getPxSize(trackHeight ?? sizes.track.height, s),
        borderRadius: getPxSize(18, s),
        background: 'gray',
      },
      thumb: ({ checked }) => ({
        position: 'absolute',
        top: '50%',
        width: getPxSize(thumbSize ?? sizes.thumb, s),
        height: getPxSize(thumbSize ?? sizes.thumb, s),
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
        fontSize: getPxSize(sizes.label, s),
        fontWeight: 400,
        color: disabled ? Colors.Nobel : Colors.Black,
      }),
    },
    cs,
  );
};
