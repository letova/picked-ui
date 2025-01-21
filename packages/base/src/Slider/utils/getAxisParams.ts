import { CSSProperties } from "react";

import { Orientation } from "../Slider.types";

export const getOffsetStyle = (orientation: Orientation, percent: number): CSSProperties => {
    switch (orientation) {
        case 'horizontal': return { left: `${percent}%` };
        case 'vertical': return { bottom: `${percent}%` };
        default: throw new Error(`Slider getAxisParams: unknown orientation - ${orientation}`)
    }
}

export const getLeapStyle = (orientation: Orientation, percent: number): CSSProperties => {
    switch (orientation) {
        case 'horizontal': return { width: `${percent}%` };
        case 'vertical': return { height: `${percent}%` };
        default: throw new Error(`Slider getLeapStyle: unknown orientation - ${orientation}`)
    }
}