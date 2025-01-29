import { ForwardedRef, forwardRef } from 'react';
import { Slider as BaseSlider } from '@picked-ui/base';

import { SliderProps } from './Slider.types';
import { getCS } from './Slider.styles';

const Slider = forwardRef((props: SliderProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  const cs = getCS(props);

  return (
    <BaseSlider
      ref={ref}
      className={className}
      {...restProps}
      cs={cs}
    />
  );
});

export { Slider };