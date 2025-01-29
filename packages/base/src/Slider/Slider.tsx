import { ForwardedRef, forwardRef, Fragment } from "react";
import { cx } from '@emotion/css';

import { ClassNameGenerator, convertCSToClassName, getElementFromSlot } from "../utils";

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
      cs,
    }: SliderProps,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    const railElement = getElementFromSlot(
      {
        component: 'span',
        ...slots.rail
      },
      {
        className: cx(getCN('rail'), convertCSToClassName(cs?.rail)),
      }
    );

    const trackElement = getElementFromSlot(
      {
        component: 'span',
        ...slots.track
      },
      {
        className: cx(getCN('track'), convertCSToClassName(cs?.track)),
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
          convertCSToClassName(cs?.container),
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
              className: cx(getCN('mark'), convertCSToClassName(cs?.mark)),
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
              className: cx(getCN('thumb'), convertCSToClassName(cs?.thumb)),
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
