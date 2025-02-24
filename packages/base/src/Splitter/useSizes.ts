interface UseSizesOptions {
  containerSize?: number;
  defaultChildSizes: (number | string | undefined)[];
}

export const useSizes = ({ containerSize, defaultChildSizes }: UseSizesOptions) => {
  if (!containerSize || containerSize === 0) {
    return defaultChildSizes.map(() => {
      return { width: 0, percentWidth: 0 };
    });
  }

  const [sizes, totalSize, positiveValueCount] = defaultChildSizes.reduce<[number[], number, number]>(
    (result, size) => {
      let [nextS, nextTS, nextPVC] = result;

      if (typeof size === 'number') {
        nextTS += size;
        nextS.push(size);
      }

      if (typeof size === 'string') {
        const value = (containerSize * parseFloat(size)) / 100;
        nextTS += value;
        nextS.push(value);
      }

      if (size === 'undefined') {
        nextS = [...nextS, 0];
      }

      if (size) {
        nextPVC += 1;
      }

      return [nextS, nextTS, nextPVC];
    },
    [[], 0, 0],
  );

  const overflow = Math.max(0, totalSize - containerSize);
  const shortage = Math.max(0, containerSize - totalSize);

  let subtract = 0;

  if (overflow) {
    subtract = overflow / positiveValueCount;
  } else if (shortage) {
    subtract = -(overflow / positiveValueCount);
  }

  return sizes.map((size) => {
    const preparedWidth = size - subtract;

    return { width: preparedWidth, percentWidth: (preparedWidth / containerSize) * 100 };
  });
};
