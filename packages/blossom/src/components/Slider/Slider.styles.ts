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

    },
    track: {

    },
    mark: {

    },
    thumb: {

    },
  };
};
