import { Mark } from "../Slider.types";

/**
 * Thumb movement type
 * 
 * `arbitrary` - can move freely along the rail
 * 
 * `step` - can move with a set step
 * 
 * `mark` - moves only along the set marks, which are specified by the user
 */
export type ThumbMoveType = 'arbitrary' | 'step' | 'mark';

export const getThumbMoveType = (marks: boolean | Mark[]): ThumbMoveType => {
    switch (typeof marks) {
        case 'object': return 'mark';
        case 'boolean': return marks ? 'step' : 'arbitrary';
        default: return 'arbitrary';
    }
}