import { SliderProps } from './Slider.types';

export const getCS = ({ orientation, disabled }: SliderProps): SliderProps['cs'] => {
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
    },
    track: {

    },
    mark: {

    },
    thumb: {

    },
  };
};
