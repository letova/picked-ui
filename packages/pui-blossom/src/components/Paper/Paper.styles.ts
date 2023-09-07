import { css } from '@emotion/css';

import { getPxSize, getRemSize } from '../../utils';

import { PaperProps } from './Paper.types';

export enum Colors {
  SemitransparentBlack10 = 'rgba(0, 0, 0, 0.1)',
  SemitransparentBlack15 = 'rgba(0, 0, 0, 0.15)',
  SemitransparentBlack20 = 'rgba(0, 0, 0, 0.2)',
  SemitransparentBlack25 = 'rgba(0, 0, 0, 0.25)',
  SemitransparentBlack30 = 'rgba(0, 0, 0, 0.3)',
}

const getBoxShadowValue = (elevation: number, s: number) => {
  switch (elevation) {
    case 0:
    default: {
      return 'none';
    }
    case 1: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(1, s)} ${getPxSize(2, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 2: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(2, s)} ${getPxSize(3, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 3: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(3, s)} ${getPxSize(5, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 4: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(4, s)} ${getPxSize(6, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 5: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(5, s)} ${getPxSize(8, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 6: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(6, s)} ${getPxSize(9, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 7: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(7, s)} ${getPxSize(11, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 8: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(8, s)} ${getPxSize(12, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 9: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(9, s)} ${getPxSize(14, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 10: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(10, s)} ${getPxSize(15, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 11: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(11, s)} ${getPxSize(17, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 12: {
      return `0 0 ${getPxSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getPxSize(12, s)} ${getPxSize(18, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
  }
};

export const getClassName = ({ elevation = 0, scale: s = 1, square = false, outline = false }: PaperProps) => {
  return css`
    border: ${outline ? `${getPxSize(1, s)} solid gray` : 'none'};
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getRemSize(0.875, s)};
    box-shadow: ${getBoxShadowValue(elevation, s)};
    border-radius: ${square ? 0 : getPxSize(3, s)};
  `;
};
