/* eslint-disable @typescript-eslint/no-unsafe-return */
import merge from 'lodash.merge';
import { CSSObject } from '@emotion/css';

export type CSFn = (state: Record<string, any>) => CSSObject;

export type CSFnParameters = Parameters<CSFn>;

export const deepMergeCS = <T extends Record<string, any>>(
  baseStyles?: T | undefined,
  overrideStyles?: T | undefined,
): T | undefined => {
  if (!baseStyles && !overrideStyles) {
    return undefined;
  }

  if (baseStyles && !overrideStyles) {
    return baseStyles;
  }

  if (!baseStyles && overrideStyles) {
    return overrideStyles;
  }

  const result: Record<string, any> = {};

  for (const key in baseStyles) {
    if (Object.prototype.hasOwnProperty.call(baseStyles, key)) {
      const baseStyle: Record<string, any> | CSFn = baseStyles[key];
      const overrideStyle: Record<string, any> | CSFn = overrideStyles![key];

      if (overrideStyle === undefined) {
        result[key] = baseStyle;
      } else if (typeof baseStyle === 'function' && typeof overrideStyle === 'function') {
        result[key] = (...args: CSFnParameters) => merge(baseStyle(...args), overrideStyle(...args));
      } else if (typeof baseStyle === 'function' && typeof overrideStyle === 'object') {
        result[key] = (...args: CSFnParameters) => merge(baseStyle(...args), overrideStyle);
      } else if (typeof baseStyle === 'object' && typeof overrideStyle === 'function') {
        result[key] = (...args: CSFnParameters) => merge(baseStyle, overrideStyle(...args));
      } else if (typeof baseStyle === 'object' && typeof overrideStyle === 'object') {
        result[key] = deepMergeCS(baseStyle, overrideStyle);
      } else {
        result[key] = overrideStyle;
      }
    }
  }

  for (const key in overrideStyles) {
    if (Object.prototype.hasOwnProperty.call(overrideStyles, key) && !(key in baseStyles!)) {
      result[key] = overrideStyles[key];
    }
  }

  return result as T;
};
