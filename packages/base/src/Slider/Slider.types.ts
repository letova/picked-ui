import React, { ReactNode } from "react";

import { CustomStyle, Slot } from "../types";

export interface Mark {
  label?: ReactNode;
  value: number;
}

export type Orientation = 'horizontal' | 'vertical';

export interface SliderCS {
  container?: CustomStyle;
  rail?: CustomStyle;
  track?: CustomStyle;
  mark?: CustomStyle;
  thumb?: CustomStyle;
}


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
   * Custom styles 
   * */
  cs?: SliderCS;
  /**
   * Disabled slider
   * @default false
   */
  disabled?: boolean;
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

// FOR UTILS 
/**
 * Thumb movement type
 * 
 * `arbitrary` - can move freely along the rail
 * 
 * `step` - can move with a set step
 * 
 * `mark` - moves only along the set marks, which are specified by the user
 */
export type ThumbMoveType = 'arbitrary' | 'step' | 'mark';

export interface ThumbCoords {
  x: number;
  y: number;
}