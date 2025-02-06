import { ForwardedRef, useRef } from "react";

import { useForkRef } from "../../hooks";

import { Mark } from "../Slider.types";

import { getMarksFromParams, getThumbMoveType, getTrack, Track, getValuesArr } from "../utils";

interface UseSliderParams {
    min: number;
    max: number;
    step: number;
    marks: boolean | Mark[];
    value: number | number[] | undefined;
    ref: ForwardedRef<HTMLSpanElement>;
}

interface UseSliderReturnValue {
    marks: Mark[];
    values: number[];
    track: Track;
}

export const useSlider = ({
    min,
    max,
    step,
    marks: marksParam,
    value,
    ref,
}: UseSliderParams): UseSliderReturnValue => {
    const ownerSliderRef = useRef<HTMLSpanElement>(null);
    const handleSliderRef = useForkRef(ref, ownerSliderRef);

    const isRange = Array.isArray(value);
    const thumbMoveType = getThumbMoveType(marksParam);
    const marks = getMarksFromParams({ min, max, step, marks: marksParam, thumbMoveType });

    const values = getValuesArr(value, min);
    const track = getTrack({ isRange, values, min, max });

    return {
        marks,
        values,
        track,
    }
}