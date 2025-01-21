export const getNearestStepValue = (value: number, step: number, min: number): number => {
    const nearestValue = Math.round((value - min) / step) * step + min;

    return nearestValue;
}