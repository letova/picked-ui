export const getIsPassedMark = (markValue: number, value: number) => {
    const isPassed = markValue <= value;

    return isPassed;
}