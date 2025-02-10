const areEqualArrays = (arr1: number[], arr2: number[]): boolean => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((value, index) => value === arr2[index]);
}

export const areEqualValues = (value1: number | number[], value2: number | number[]): boolean => {
    if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 === value2;
    }

    if (Array.isArray(value1) && Array.isArray(value2)) {
        return areEqualArrays(value1, value2);
    }

    return false;
}