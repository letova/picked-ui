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

  const numberSizes: (number | undefined)[] = [];

  let totalSize = 0;
  let changableSizeCount = 0;
  let positiveSizeCount = 0;

  defaultChildSizes.forEach((size) => {
    let value = size;

    if (typeof size === 'number') {
      totalSize += size;
    }

    if (typeof size === 'string') {
      const numValue = (containerSize * parseFloat(size)) / 100;
      totalSize += numValue;
      value = numValue;
    }

    if (size || size === 'undefined') {
      changableSizeCount += 1;
    }

    if (value) {
      positiveSizeCount += 1;
    }

    numberSizes.push(value as number | undefined);
  });

  let resultSizes = [...numberSizes];

  const overflow = Math.max(0, totalSize - containerSize);
  const shortage = Math.max(0, containerSize - totalSize);

  if (overflow) {
    const divider = positiveSizeCount;
    resultSizes = resultSizes.map((size) => (size ? size - overflow / divider : size));
  } else if (shortage) {
    const divider = changableSizeCount || resultSizes.length;
    const addition = shortage / divider;
    resultSizes = resultSizes.map((size) => (size === 0 ? size : (size || 0) + addition));
  } else {
    resultSizes = resultSizes.map((size) => size ?? 0);
  }

  return resultSizes;
};
