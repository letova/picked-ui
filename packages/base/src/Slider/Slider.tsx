import { ForwardedRef, forwardRef, Fragment } from "react";
import { cx } from '@emotion/css';

import { ClassNameGenerator, getElementFromSlot } from "../utils";

import { Mark, SliderProps } from "./Slider.types";
import { useSlider } from "./hooks/useSlider";
import { getOffsetStyle, valueConverter } from "./utils";

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Slider', element, modificator });

const getMCN = (modificator?: string) => ClassNameGenerator.generate({ block: 'Slider', modificator });

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
        className: getCN('rail'),
      }
    );

    const trackElement = getElementFromSlot(
      {
        component: 'span',
        ...slots.track
      },
      {
        className: getCN('track'),
      }
    );

    const {
      marks,
      values,
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
          getCN(),
          getMCN(orientation),
          {
            [getMCN('disabled')]: disabled,
          },
          className,
        )}
      >
        {railElement}
        {trackElement}
        {marks.map((mark: Mark, index: number) => {
          const percent = valueConverter.valueToPercent(mark.value, min, max);
          const style = getOffsetStyle(orientation, percent);

          const markElement = getElementFromSlot(
            {
              component: 'span',
              ...slots.mark
            },
            {
              className: getCN('mark'),
              style: style
            }
          );

          return (
            <Fragment key={index}>
              {markElement}
            </Fragment>
          );
        })}
        {values.map((val: number, index: number) => {
          const percent = valueConverter.valueToPercent(val, min, max);
          const style = getOffsetStyle(orientation, percent);

          const thumbElement = getElementFromSlot(
            {
              component: 'span',
              ...slots.thumb,
            },
            {
              className: getCN('thumb'),
              style: style
            }
          );

          return (
            <Fragment key={index}>
              {thumbElement}
            </Fragment>
          )
        })}
      </span>
    );
  },
);
