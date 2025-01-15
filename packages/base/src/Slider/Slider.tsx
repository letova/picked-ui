import { ForwardedRef, forwardRef } from "react";
import { cx } from '@emotion/css';

import { SliderProps } from "./Slider.types";

export const Slider = forwardRef(
  (
    {
      className,
      disabled = false,
    }: SliderProps,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    return (
      <span
        ref={ref}
        className={cx(
          'Slider',
          {
            'Slider--disabled': disabled,
          },
          className,
        )}
      >
        {'Rail'}
        {'Thumbs'}
      </span>
    );
  },
);
