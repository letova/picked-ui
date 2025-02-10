import { Orientation, ThumbCoords, ThumbMoveType } from "../Slider.types";

import { clamp } from "./clamp";
import { getNearestValueFromArray, getNearestValueFromStep } from "./getNearestValue";
import { valueConverter } from "./valueConverter";

interface ThumbNewValueParams {
    min: number;
    max: number;
    step: number;
    marksValues: number[];
    orientation: Orientation;
    thumbMoveType: ThumbMoveType;
    sliderDOMRect: DOMRect;
    thumbCoords: ThumbCoords;
}

const getPercent = (orientation: Orientation, sliderDomRect: DOMRect, thumbCoords: ThumbCoords): number => {
    const { bottom, height, left, width } = sliderDomRect;
    const { x, y } = thumbCoords;

    switch (orientation) {
        case 'horizontal': return (x - left) / width;
        case 'vertical': return (bottom - y) / height;
        default: throw new Error(`Slider getPercent: unknown orientation - ${orientation}`)
    }
}

const getNewValue = (params: ThumbNewValueParams, percent: number): number => {
    const { min, max, step, marksValues, thumbMoveType } = params;

    const value: number = valueConverter.percentToValue(percent, min, max);

    switch (thumbMoveType) {
        case 'step': return getNearestValueFromStep(value, step, min);
        case 'mark': return getNearestValueFromArray(marksValues, value);
        default: return value;
    }
}

export const getThumbNewValue = (params: ThumbNewValueParams): number => {
    const { min, max, orientation, sliderDOMRect, thumbCoords } = params;

    const percent = getPercent(orientation, sliderDOMRect, thumbCoords);
    const newValue = clamp(getNewValue(params, percent), min, max);

    return newValue;
}