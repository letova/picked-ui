import { Mark, ThumbMoveType } from "../Slider.types";

export const getThumbMoveType = (marks: boolean | Mark[]): ThumbMoveType => {
    switch (typeof marks) {
        case 'object': return 'mark';
        case 'boolean': return marks ? 'step' : 'arbitrary';
        default: return 'arbitrary';
    }
}