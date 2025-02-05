import { Mark } from "../Slider.types";

import { getMarksFromParams } from "../utils";
import { getThumbMoveType } from "../utils/getThumbMoveType";
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
}

export const useSlider = ({
    min,
    max,
    step,
    marks: marksParam,
    value,
}: UseSliderParams): UseSliderReturnValue => {
    const thumbMoveType = getThumbMoveType(marksParam);
    const marks = getMarksFromParams({ min, max, step, marks: marksParam, thumbMoveType });

    return {
        marks,
        values: getValuesArr(value, min),
    }
}