import { Mark } from "../Slider.types";

import { ThumbMoveType } from "./getThumbMoveType";

interface MarksParams {
    min: number;
    max: number;
    step: number;
    marks?: boolean | Mark[];
    thumbMoveType: ThumbMoveType;
}

const filterMarksByAllowedRange = (marks: Mark[], min: number, max: number): Mark[] => {
    const marksFiltered: Mark[] = marks.filter((mark) => mark.value >= min && mark.value <= max);

    return marksFiltered;
}

const getMarksByStep = (min: number, max: number, step: number): Mark[] => {
    const marks: Mark[] = [];

    for (let value = min; value <= max; value += step) {
        marks.push({ value })
    }

    return marks;
}

export const getMarksFromParams = ({ min, max, step, marks, thumbMoveType }: MarksParams): Mark[] => {
    switch (thumbMoveType) {
        case 'mark': return filterMarksByAllowedRange(marks as Mark[], min, max);
        case 'step': return getMarksByStep(min, max, step);
        default: return [];
    }
}

export const getMarksValues = (marks: Mark[]): number[] => {
    const values: number[] = marks.map(({ value }: Mark) => value);

    return values;
}