import { valueConverter } from "./valueConverter";

interface TrackParams {
    isRange: boolean;
    min: number;
    max: number;
    values: number[];
}

export interface Track {
    offset: number;
    leap: number;
}

export const getTrack = ({ isRange, min, max, values }: TrackParams): Track => {
    const valueFrom: number = isRange ? values[0] : min;
    const valueTo: number = values[values.length - 1];

    const from: number = valueConverter.valueToPercent(valueFrom, min, max);
    const to: number = valueConverter.valueToPercent(valueTo, min, max);

    const track: Track = {
        offset: from,
        leap: to - from,
    }

    return track;
}