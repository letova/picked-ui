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

const T_BORDER_SIZE = 1;

const calcThumbMargin = (thumbSize: number, trackHeight: number) => {
  if (thumbSize >= trackHeight) {
    return 0;
  }

  return Math.round((trackHeight - thumbSize) / 2);
};

export const getCS = ({
  variant = 'solid',
  scale: s = 1,
  skidding = 0,
  size = 's',
  trackWidth,
  trackHeight: userTrackHeight,
  thumbSize: userThumbSize,
  cs,
  focusOutlineWraps = 'input',
}: SwitchProps): SwitchProps['cs'] => {
  const colors = VARIANT_COLORS_MAP[variant];
  const sizes = SIZES_MAP[size];

  const trackHeight = userTrackHeight ?? sizes.track.height;

  const thumbSize = userThumbSize ?? sizes.thumb;
  const thumbMargin = calcThumbMargin(
    thumbSize,
    variant === 'outlined' ? trackHeight - T_BORDER_SIZE * 2 : trackHeight,
  );

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
        height: getPxSize(trackHeight, s),
        borderRadius: getPxSize(18, s),
        background: disabled ? 'lightgray' : colors.trackBg,

        ...(focusVisible && focusOutlineWraps === 'input'
          ? { outline: `${getPxSize(2, s)} solid ${Colors.ScienceBlue}`, outlineOffset: getPxSize(2, s) }
          : undefined),

        ...(variant === 'outlined' ? { border: `${getPxSize(T_BORDER_SIZE, s)} solid gray` } : undefined),
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
          ? `calc(100% - ${getPxSize(thumbMargin + thumbSize, s)} + ${getPxSize(skidding, s)})`
          : `calc(${getPxSize(thumbMargin, s)} - ${getPxSize(skidding, s)})`,
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
              top: getPxSize(-T_BORDER_SIZE, s),
              left: getPxSize(-T_BORDER_SIZE, s),
              width: `calc(100% + ${getPxSize(T_BORDER_SIZE, s)})`,
              height: `calc(100% + ${getPxSize(T_BORDER_SIZE, s)})`,
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
