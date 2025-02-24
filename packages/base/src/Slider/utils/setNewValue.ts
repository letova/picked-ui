export const setNewValue = (values: number[], value: number, index: number): number[] => {
    if (values.length === 1) {
        return [value];
    }

    const valuesNew = values.slice();
    valuesNew[index] = value;

    return valuesNew;
}