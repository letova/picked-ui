export const valueConverter = {
    valueToPercent: (value: number, min: number, max: number): number => {
        const percent = ((value - min) * 100) / (max - min);

        return percent
    },
    percentToValue: (percent: number, min: number, max: number): number => {
        const value = (max - min) * percent + min;

        return value;
    }
}