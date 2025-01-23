import { Mark } from "../Slider.types";

import { getMarksFromParams } from "../utils";
import { getThumbMoveType } from "../utils/getThumbMoveType";

interface UseSliderParams {
    min: number;
    max: number;
    step: number;
    marks: boolean | Mark[];
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
}: UseSliderParams): UseSliderReturnValue => {
    const thumbMoveType = getThumbMoveType(marksParam);
    const marks = getMarksFromParams({ min, max, step, marks: marksParam, thumbMoveType });

    return {
        marks,
        values: [],
    }
}