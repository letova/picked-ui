import { css } from '@emotion/css';

import { getPxSize, getRemSize } from '../../utils';

import { HeadingProps } from './Heading.types';

const getDynamicStyle = (level: number) => {
  switch (level) {
    case 1: {
      return {
        xs: { fontSize: 1.55, padding: 32 }, // 200 +
        s: { fontSize: 2.3, padding: 32 }, // 400
        m: { fontSize: 2.8, padding: 32 }, // 450
      };
    }
    default:
    case 2: {
      return {
        xs: { fontSize: 1.35, padding: 28 }, // 150
        s: { fontSize: 1.9, padding: 28 }, // 300
        m: { fontSize: 2.35, padding: 28 }, // 350
      };
    }
    case 3: {
      return {
        xs: { fontSize: 1.2, padding: 24 }, // 125
        s: { fontSize: 1.6, padding: 24 }, // 250
        m: { fontSize: 2, padding: 24 }, // 300
      };
    }
    case 4: {
      return {
        xs: { fontSize: 1.075, padding: 20 }, // 100
        s: { fontSize: 1.35, padding: 20 }, // 200
        m: { fontSize: 1.7, padding: 20 }, // 250
      };
    }
    case 5: {
      return {
        xs: { fontSize: 0.975, padding: 16 }, // 75
        s: { fontSize: 1.15, padding: 16 }, // 150
        m: { fontSize: 1.45, padding: 16 }, // 200
      };
    }
    case 6: {
      return {
        xs: { fontSize: 0.9, padding: 12 },
        s: { fontSize: 1, padding: 12 },
        m: { fontSize: 1.25, padding: 12 },
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
    font-size: ${getRemSize(dynamicStyle.fontSize, s)};
  `;
};
