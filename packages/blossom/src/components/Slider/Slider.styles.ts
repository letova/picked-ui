import { PALETTE_FOR_DISABLED_MAP, PALETTE_MAP } from './Slider.palettes';
import { SliderProps } from './Slider.types';

export const getCS = ({
  orientation,
  disabled,
  color = 'neutral'
}: SliderProps): SliderProps['cs'] => {
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
    mark: {
      position: 'absolute',
      display: 'block',
      width: '2px',
      height: '2px',
      borderRadius: '2px',
      left: orientation === 'horizontal' ? undefined : '50%',
      top: orientation === 'horizontal' ? '50%' : undefined,
      transform: orientation === 'horizontal' ? 'translateY(-50%)' : 'translateX(-50%)',
      backgroundColor: disabled ? disabledPalette.bg : palette.bg.normal,
    },
    thumb: {
      position: 'absolute',
      display: 'block',
      width: '15px',
      height: '15px',
      borderRadius: '15px',
      left: orientation === 'horizontal' ? undefined : '50%',
      top: orientation === 'horizontal' ? '50%' : undefined,
      transform: orientation === 'horizontal' ? 'translate(-50%, -50%)' : 'translateX(-50%, 50%)',
      backgroundColor: disabled ? disabledPalette.bg : palette.bg.normal,

      '&:hover': {
        backgroundColor: disabled ? disabledPalette.bg : palette.bg.hover,
      },

      '&:active': {
        backgroundColor: disabled ? disabledPalette.bg : palette.bg.active,
      },
    },
  };
};
