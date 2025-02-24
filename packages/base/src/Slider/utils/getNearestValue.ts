export const getNearestValueFromStep = (value: number, step: number, min: number): number => {
    const nearestValue = Math.round((value - min) / step) * step + min;

    return nearestValue;
}

export const getNearestValueFromArray = (arr: number[], value: number): number => {
    const nearestValue: number = arr.reduce((nearest: number, num: number) => {
        const distanceNum = Math.abs(num - value);
        const distanceNearest = Math.abs(nearest - value);

        return distanceNum >= distanceNearest && nearest < num ? nearest : num;
    });

    return nearestValue;
}

export const getNearestValueIndex = (arr: number[], value: number): number => {
    const nearestValue = getNearestValueFromArray(arr, value);
    const nearestValueIndex = arr.indexOf(nearestValue);

    return nearestValueIndex;
}