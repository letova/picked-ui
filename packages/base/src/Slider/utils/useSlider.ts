import { Mark } from "../Slider.types";

import { getMarksFromOptions } from "./marks";

interface UseSliderParams {
    min: number;
    max: number;
    step: number;
    marks: boolean | Mark[];
}

interface UseSliderReturnValue {
    marks: Mark[];
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
    }
}