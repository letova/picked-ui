import { Mark } from "../Slider.types";

export const filterMarksByAllowedRange = (marks: Mark[], min: number, max: number): Mark[] => {
    const marksFiltered: Mark[] = marks.filter((mark) => mark.value >= min && mark.value <= max);

    return marksFiltered;
}