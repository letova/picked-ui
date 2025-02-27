interface UseSizesOptions {
  containerSize?: number;
  defaultChildSizes: { size: number | string | undefined }[];
}

export const getSizes = ({ containerSize, defaultChildSizes }: UseSizesOptions) => {
  if (!containerSize || containerSize === 0) {
    return defaultChildSizes.map(() => {
      return { size: 0, percentSize: 0 };
    });
  }

  const numberSizes: (number | undefined)[] = [];

  let totalSize = 0;
  let undefinedSizeCount = 0;
  let positiveSizeCount = 0;

  defaultChildSizes.forEach(({ size }) => {
    let value = size;

    if (typeof size === 'number') {
      totalSize += size;
    }

    if (typeof size === 'string') {
      const numValue = (containerSize * parseFloat(size)) / 100;
      totalSize += numValue;
      value = numValue;
    }

    if (size === undefined) {
      undefinedSizeCount += 1;
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
  } else if (shortage && undefinedSizeCount) {
    const addition = shortage / undefinedSizeCount;
    resultSizes = resultSizes.map((size) => (size === undefined ? (size || 0) + addition : size));
  } else if (shortage && positiveSizeCount) {
    const addition = shortage / positiveSizeCount;
    resultSizes = resultSizes.map((size) => (size ? (size || 0) + addition : size));
  } else {
    resultSizes = resultSizes.map((size) => size ?? 0);
  }

  return resultSizes.map((size) => {
    const actualSize = size ?? 0;

    return { size: actualSize, percentSize: actualSize === 0 ? 0 : (actualSize / containerSize) * 100 };
  });
};
