import { getPxSize } from '../../utils';

import { PALETTE_FOR_DISABLED_MAP, PALETTE_MAP } from './Slider.palettes';
import { SliderProps } from './Slider.types';

const SIZES_MAP = {
  xs: {
    thumbSize: 14,
  },
  s: {
    thumbSize: 16,
  },
  m: {
    thumbSize: 18,
  },
};

export const getCS = ({
  disabled,
  orientation = 'horizontal',
  color = 'primary',
  scale = 1,
  size = 's',
}: SliderProps): SliderProps['cs'] => {
  const sizes = SIZES_MAP[size];
  const palette = PALETTE_MAP[color];
  const disabledPalette = PALETTE_FOR_DISABLED_MAP;

  return {
    container: {
      position: 'relative',
      display: 'inline-block',
      width: orientation === 'horizontal' ? '100%' : '4px',
      height: orientation === 'horizontal' ? '4px' : '100%',
      padding: orientation === 'horizontal' ? '10px 0' : '0 10px',
      cursor: disabled ? 'default' : 'pointer',
    },
    rail: {
      position: 'absolute',
      display: 'block',
      width: orientation === 'horizontal' ? '100%' : 'inherit',
      height: orientation === 'horizontal' ? 'inherit' : '100%',
      left: orientation === 'horizontal' ? undefined : '50%',
      top: orientation === 'horizontal' ? '50%' : undefined,
      transform: orientation === 'horizontal' ? 'translateY(-50%)' : 'translateX(-50%)',
      opacity: 0.5,
      backgroundColor: disabled ? disabledPalette.bg : palette.bg.normal,
    },
    track: {
      position: 'absolute',
      display: 'block',
      height: orientation === 'horizontal' ? 'inherit' : undefined,
      width: orientation === 'horizontal' ? undefined : 'inherit',
      left: orientation === 'horizontal' ? undefined : '50%',
      top: orientation === 'horizontal' ? '50%' : undefined,
      transform: orientation === 'horizontal' ? 'translateY(-50%)' : 'translateX(-50%)',
      opacity: 0.9,
      backgroundColor: disabled ? disabledPalette.bg : palette.bg.normal,
    },
    mark: () => {
      return {
        position: 'absolute',
        display: 'block',
        width: '2px',
        height: '2px',
        borderRadius: '2px',
        left: orientation === 'horizontal' ? undefined : '50%',
        top: orientation === 'horizontal' ? '50%' : undefined,
        transform: orientation === 'horizontal' ? 'translate(-50%, -50%)' : 'translate(-50%, 50%)',
        backgroundColor: disabled ? disabledPalette.bg : palette.bg.normal,
      };
    },
    thumb: ({ isActive, isFocused }) => {
      const getThumbBackgroundColor = (isHover: boolean = false): string => {
        if (isActive) {
          return palette.bg.active;
        }
        if (isFocused) {
          return palette.bg.focus;
        }
        if (isHover) {
          palette.bg.hover;
        }

        return disabled ? disabledPalette.bg : palette.bg.normal;
      };

      return {
        position: 'absolute',
        display: 'block',
        width: getPxSize(sizes.thumbSize, scale),
        height: getPxSize(sizes.thumbSize, scale),
        borderRadius: getPxSize(sizes.thumbSize, scale),
        left: orientation === 'horizontal' ? undefined : '50%',
        top: orientation === 'horizontal' ? '50%' : undefined,
        transform: orientation === 'horizontal' ? 'translate(-50%, -50%)' : 'translate(-50%, 50%)',
        backgroundColor: getThumbBackgroundColor(),

        '&:hover': {
          backgroundColor: getThumbBackgroundColor(true),
        },
      };
    },
  };
};
