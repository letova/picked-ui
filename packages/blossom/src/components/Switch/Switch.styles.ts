import { deepMergeCS, getPxSize } from '../../utils';
import { Colors } from '../../constants';

import { SwitchProps } from './Switch.types';

const VARIANT_COLORS_MAP = {
  solid: {
    trackBg: 'gray',
    thumbBg: 'white',
  },
  soft: {
    trackBg: 'lightgray',
    thumbBg: 'white',
  },
  outlined: {
    trackBg: 'white',
    thumbBg: 'gray',
  },
};

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
  variant = 'solid',
  scale: s = 1,
  size = 's',
  trackWidth,
  trackHeight,
  thumbSize: userThumbSize,
  cs,
  focusOutlineWraps = 'input',
}: SwitchProps): SwitchProps['cs'] => {
  const colors = VARIANT_COLORS_MAP[variant];
  const sizes = SIZES_MAP[size];

  const thumbMargin = variant === 'outlined' ? 1 : 2;
  const thumbSize = userThumbSize ?? sizes.thumb;

  const thumbShift = userThumbSize ? Math.max((userThumbSize - sizes.thumb) / 2, 0) : 0;

  return deepMergeCS(
    {
      container: {
        alignSelf: 'center',

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
      track: ({ disabled, focusVisible }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: getPxSize(trackWidth ?? sizes.track.width, s),
        height: getPxSize(trackHeight ?? sizes.track.height, s),
        borderRadius: getPxSize(18, s),
        background: disabled ? 'lightgray' : colors.trackBg,

        ...(focusVisible && focusOutlineWraps === 'input'
          ? { outline: `${getPxSize(2, s)} solid ${Colors.ScienceBlue}`, outlineOffset: getPxSize(2, s) }
          : undefined),

        ...(variant === 'outlined' ? { border: `${getPxSize(1, s)} solid gray` } : undefined),
      }),
      thumb: ({ checked }) => ({
        position: 'absolute',
        top: '50%',
        width: getPxSize(thumbSize, s),
        height: getPxSize(thumbSize, s),
        background: colors.thumbBg,
        pointerEvents: 'none',
        transition: 'left .15s ease-out',
        transform: 'translateY(-50%)',
        borderRadius: '100%',
        left: checked
          ? `calc(100% - ${getPxSize(thumbMargin + thumbSize, s)} + ${getPxSize(thumbShift, s)})`
          : `calc(${getPxSize(thumbMargin, s)} - ${getPxSize(thumbShift, s)})`,
      }),
      action: ({ focusVisible }) => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: getPxSize(18, s),

        ...(focusVisible && focusOutlineWraps === 'full'
          ? { outline: `${getPxSize(2, s)} solid ${Colors.ScienceBlue}`, outlineOffset: getPxSize(2, s) }
          : undefined),

        ...(variant === 'outlined'
          ? {
              top: getPxSize(-IC_BORDER_SIZE, s),
              left: getPxSize(-IC_BORDER_SIZE, s),
              width: `calc(100% + ${getPxSize(IC_BORDER_SIZE, s)})`,
              height: `calc(100% + ${getPxSize(IC_BORDER_SIZE, s)})`,
            }
          : undefined),
      }),
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
