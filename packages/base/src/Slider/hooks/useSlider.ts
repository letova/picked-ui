import { Mark } from "../Slider.types";

import { getMarksFromOptions } from "../utils";

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
    const marks = getMarksFromOptions({ min, max, step, marks: marksParam });

    return {
        marks,
        values: [],
    }
}