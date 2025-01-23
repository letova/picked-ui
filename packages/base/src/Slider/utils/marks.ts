import { Mark } from "../Slider.types";

interface MarksOptions {
    min: number;
    max: number;
    step: number;
    marks?: boolean | Mark[];
}

const filterMarksByAllowedRange = (marks: Mark[], min: number, max: number): Mark[] => {
    const marksFiltered: Mark[] = marks.filter((mark) => mark.value >= min && mark.value <= max);

    return marksFiltered;
}

const getMarksByStep = (min: number, max: number, step: number): Mark[] => {
    const marks: Mark[] = [];

    for (let value = min; value <= max; value += step) {
        marks.push({ value })
    };

    return marks;
}

export const getMarksFromOptions = ({ min, max, step, marks }: MarksOptions): Mark[] => {
    switch (typeof marks) {
        case 'object': return filterMarksByAllowedRange(marks, min, max);
        case 'boolean': return step ? getMarksByStep(min, max, step) : [];
        default: return [];
    }
}