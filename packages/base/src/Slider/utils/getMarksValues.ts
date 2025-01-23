import { Mark } from "../Slider.types";

export const getMarksValues = (marks: Mark[]): number[] => {
    const values: number[] = marks.map(({ value }: Mark) => value);

    return values;
}