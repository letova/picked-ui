/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import merge from 'lodash.merge';

export const deepMergeCS = (baseStyles?: any, overrideStyles?: any): any => {
  if (!baseStyles && !overrideStyles) {
    return undefined;
  }

  if (baseStyles && !overrideStyles) {
    return baseStyles;
  }

  if (!baseStyles && overrideStyles) {
    return overrideStyles;
  }

  const result: any = {};

  for (const key in baseStyles) {
    if (Object.prototype.hasOwnProperty.call(baseStyles, key)) {
      const baseStyle = baseStyles[key];
      const overrideStyle = overrideStyles[key];

      if (overrideStyle === undefined) {
        result[key] = baseStyle;
      } else if (typeof baseStyle === 'function' && typeof overrideStyle === 'function') {
        result[key] = (...args: any[]) => merge(baseStyle(...args), overrideStyle(...args));
      } else if (typeof baseStyle === 'function' && typeof overrideStyle === 'object') {
        result[key] = (...args: any[]) => merge(baseStyle(...args), overrideStyle);
      } else if (typeof baseStyle === 'object' && typeof overrideStyle === 'function') {
        result[key] = (...args: any[]) => merge(baseStyle, overrideStyle(...args));
      } else if (typeof baseStyle === 'object' && typeof overrideStyle === 'object') {
        result[key] = deepMergeCS(baseStyle, overrideStyle);
      } else {
        result[key] = overrideStyle;
      }
    }
  }

  for (const key in overrideStyles) {
    if (Object.prototype.hasOwnProperty.call(overrideStyles, key) && !(key in baseStyles)) {
      result[key] = overrideStyles[key];
    }
  }

  return result;
};
