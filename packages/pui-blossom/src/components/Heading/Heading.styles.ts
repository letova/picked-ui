import { css } from '@emotion/css';

import { getPxSize } from '../../utils';

import { HeadingProps } from './Heading.types';

const getDynamicStyle = (level: number) => {
  switch (level) {
    case 1: {
      return {
        xs: { fontSize: 30, padding: 32 },
        s: { fontSize: 38, padding: 32 },
        m: { fontSize: 46, padding: 32 },
      };
    }
    default:
    case 2: {
      return {
        xs: { fontSize: 26, padding: 28 },
        s: { fontSize: 32, padding: 28 },
        m: { fontSize: 38, padding: 28 },
      };
    }
    case 3: {
      return {
        xs: { fontSize: 23, padding: 24 },
        s: { fontSize: 28, padding: 24 },
        m: { fontSize: 33, padding: 24 },
      };
    }
    case 4: {
      return {
        xs: { fontSize: 20, padding: 20 },
        s: { fontSize: 24, padding: 20 },
        m: { fontSize: 28, padding: 20 },
      };
    }
    case 5: {
      return {
        xs: { fontSize: 17, padding: 16 },
        s: { fontSize: 20, padding: 16 },
        m: { fontSize: 23, padding: 16 },
      };
    }
    case 6: {
      return {
        xs: { fontSize: 14, padding: 12 },
        s: { fontSize: 16, padding: 12 },
        m: { fontSize: 18, padding: 12 },
      };
    }
  }
};

export const getClassName = ({ level = 2, size = 's', scale: s = 1 }: HeadingProps) => {
  const dynamicStyle = getDynamicStyle(level)[size];

  return css`
    margin: 0;
    margin-bottom: ${getPxSize(dynamicStyle.padding, s)};
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 700;
    font-size: ${getPxSize(dynamicStyle.fontSize, s)};
  `;
};
