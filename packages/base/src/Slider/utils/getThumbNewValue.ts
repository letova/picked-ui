import { Orientation, ThumbCoords, ThumbMovement } from "../Slider.types";

import { clamp } from "./clamp";
import { getNearestValueFromArray, getNearestValueFromStep } from "./getNearestValue";
import { valueConverter } from "./valueConverter";

interface ThumpNewValueParams {
    min: number;
    max: number;
    step: number;
    marksValues: number[];
    orientation: Orientation;
    thumbMovement: ThumbMovement;
    sliderDOMRect: DOMRect;
    thumbCoords: ThumbCoords;
}

const getPercent = (orientation: Orientation, { bottom, height, left, width }: DOMRect, { x, y }: ThumbCoords): number => {
    switch (orientation) {
        case 'horizontal': return (bottom - y) / height;
        case 'vertical': return (x - left) / width;
        default: throw new Error(`Slider getPercent: unknown orientation - ${orientation}`)
    }
}

const getNewValue = ({ min, max, step, marksValues, thumbMovement }: ThumpNewValueParams, percent: number): number => {
    const value: number = valueConverter.percentToValue(percent, min, max);

    switch (thumbMovement) {
        case 'step': return getNearestValueFromStep(value, step, min);
        case 'mark': return getNearestValueFromArray(marksValues, value);
        default: return value;
    }
}

export const getThumbNewValue = (params: ThumpNewValueParams) => {
    const { min, max, orientation, sliderDOMRect, thumbCoords } = params;

    const percent = getPercent(orientation, sliderDOMRect, thumbCoords);
    const newValue = clamp(getNewValue(params, percent), min, max);

    return newValue;
}