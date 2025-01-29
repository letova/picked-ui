import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';
import { Slider as BaseSlider } from '@picked-ui/base';

import { SliderProps } from './Slider.types';
import { getClassName } from './Slider.styles';

const Slider = forwardRef((props: SliderProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return <BaseSlider ref={ref} className={cx(className, getClassName(props))} {...restProps} />;
});

export { Slider };