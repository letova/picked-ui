import React, { ReactNode } from "react";

import { Slot } from "../types";

export interface Mark {
  label?: ReactNode;
  value: number;
}

export type Orientation = 'horizontal' | 'vertical';


export interface SliderProps {
  /**
  * Class name applied to the root element.
  */
  className?: string;
  /**
   * Minimum allowed slider value.
   * @default 0
   */
  min?: number;
  /**
   * Maximum allowed slider value.
   * @default 100
   */
  max?: number;
  /**
   * Determines a slider with discrete marks.
   * If `true` the marks are built automatically with a defined `step`.
   * If array user can set custom slider marks.
   * @default false
   */
  marks?: boolean | Mark[];
  /**
   * Determines the distance between discrete slider marks.
   * @default 1
   */
  step?: number;
  /**
   * Determines the component orientation.
   * @default 'horizontal'
   */
  orientation?: Orientation;
  /** 
   * Slots 
   * */
  slots?: {
    rail?: Slot;
    track?: Slot;
    mark?: Slot;
    thumb?: Slot;
  };
  /**
   * Disabled slider
   */
  disabled: boolean;
  /**
   * The default value of the slider for not controlled component.
   */
  defaultValue?: number | number[];
  /**
   * The value of the slider.
   */
  value?: number | number[];
  /**
  * Provides the picked value as a callback's argument, triggered when the thumb stops moving.
  */
  onValueChange?: (value: number | number[]) => void;
  /**
   * Provides the picked value as a callback's argument, triggered on `mouseup` event.
   */
  onValueChangeCommitted?: (value: number | number[]) => void;
}