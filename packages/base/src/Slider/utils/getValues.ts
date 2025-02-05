export const getValuesArr = (value: number | number[] | undefined, min: number): number[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'number') return [value];

    return [min];
}