import { Orientation, ThumbCoords, ThumbMovement } from "../Slider.types";

import { clamp } from "./clamp";
import { getNearestValueFromArray, getNearestValueFromStep } from "./getNearestValue";
import { valueConverter } from "./valueConverter";

interface ThumbNewValueParams {
    min: number;
    max: number;
    step: number;
    marksValues: number[];
    orientation: Orientation;
    thumbMovement: ThumbMovement;
    sliderDOMRect: DOMRect;
    thumbCoords: ThumbCoords;
}

const getPercent = (orientation: Orientation, sliderDomRect: DOMRect, thumbCoords: ThumbCoords): number => {
    const { bottom, height, left, width } = sliderDomRect;
    const { x, y } = thumbCoords;

    switch (orientation) {
        case 'horizontal': return (bottom - y) / height;
        case 'vertical': return (x - left) / width;
        default: throw new Error(`Slider getPercent: unknown orientation - ${orientation}`)
    }
}

const getNewValue = (params: ThumbNewValueParams, percent: number): number => {
    const { min, max, step, marksValues, thumbMovement } = params;

    const value: number = valueConverter.percentToValue(percent, min, max);

    switch (thumbMovement) {
        case 'step': return getNearestValueFromStep(value, step, min);
        case 'mark': return getNearestValueFromArray(marksValues, value);
        default: return value;
    }
}

export const getThumbNewValue = (params: ThumbNewValueParams) => {
    const { min, max, orientation, sliderDOMRect, thumbCoords } = params;

    const percent = getPercent(orientation, sliderDOMRect, thumbCoords);
    const newValue = clamp(getNewValue(params, percent), min, max);

    return newValue;
}