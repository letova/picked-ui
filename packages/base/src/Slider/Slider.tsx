import { ForwardedRef, forwardRef, Fragment } from "react";
import { cx } from '@emotion/css';

import { getElementFromSlot } from "../utils";

import { SliderProps } from "./Slider.types";
import { useSlider } from "./hooks/useSlider";
import { getOffsetStyle, valueConverter } from "./utils";

export const Slider = forwardRef(
  (
    {
      className,
      min = 0,
      max = 100,
      marks: userMarks = false,
      step = 1,
      orientation = 'horizontal',
      slots = {},
      disabled = false,
    }: SliderProps,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    const railElement = getElementFromSlot(
      {
        component: 'span',
        ...slots.rail
      },
      {
        className: 'Slider-rail',
      }
    );

    const trackElement = getElementFromSlot(
      {
        component: 'span',
        ...slots.track
      },
      {
        className: 'Slider-track',
      }
    );

    const thumbElement = getElementFromSlot(
      {
        component: 'span',
        ...slots.thumb,
      },
      {
        className: 'Slider-thumb',
      }
    );

    const inputElement = getElementFromSlot(
      {
        component: 'input',
        ...slots.input,
      },
      {
        className: 'Slider-input',
      }
    );

    const {
      marks,
    } = useSlider({
      min,
      max,
      step,
      marks: userMarks,
    });

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
        {railElement}
        {trackElement}
        {marks.map((mark, index: number) => {
          const percent = valueConverter.valueToPercent(mark.value, min, max);
          const style = getOffsetStyle(orientation, percent);

          const markElement = getElementFromSlot(
            {
              component: 'span',
              ...slots.mark
            },
            {
              className: 'Slider-mark',
              style: style
            }
          );

          return (
            <Fragment key={index}>
              {markElement}
            </Fragment>
          );
        })}
      </span>
    );
  },
);
