import { ForwardedRef, forwardRef, Fragment } from "react";
import { cx } from '@emotion/css';

import { getElementFromSlot } from "../utils";

import { SliderProps } from "./Slider.types";
import { useSlider } from "./utils/useSlider";

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

    const markElement = getElementFromSlot(
      {
        component: 'span',
        ...slots.mark
      },
      {
        className: 'Slider-mark',
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
        {marks.map((_, index: number) => {
          return (
            <Fragment key={index}>

            </Fragment>
          );
        })}
      </span>
    );
  },
);
