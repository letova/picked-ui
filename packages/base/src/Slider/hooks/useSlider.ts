import { Mark } from "../Slider.types";

import { getMarksFromParams } from "../utils";
import { getThumbMoveType } from "../utils/getThumbMoveType";
import { getTrack, Track } from "../utils/getTrackParams";
import { getValuesArr } from "../utils/getValues";

interface UseSliderParams {
    min: number;
    max: number;
    step: number;
    marks: boolean | Mark[];
    value: number | number[] | undefined;
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
}: UseSliderParams): UseSliderReturnValue => {
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