import { css } from '@emotion/css';

import { getSize } from '../../../utils';

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
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(1, s)} ${getSize(2, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 2: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(2, s)} ${getSize(3, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 3: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(3, s)} ${getSize(5, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 4: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(4, s)} ${getSize(6, s)} ${
        Colors.SemitransparentBlack20
      }`;
    }
    case 5: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(5, s)} ${getSize(8, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 6: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(6, s)} ${getSize(9, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 7: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(7, s)} ${getSize(11, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 8: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(8, s)} ${getSize(12, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 9: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(9, s)} ${getSize(14, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 10: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(10, s)} ${getSize(15, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 11: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(11, s)} ${getSize(17, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
    case 12: {
      return `0 0 ${getSize(1, s)} ${Colors.SemitransparentBlack30}, 0 ${getSize(12, s)} ${getSize(18, s)} ${
        Colors.SemitransparentBlack15
      }`;
    }
  }
};

export const getClassName = ({ elevation = 0, square = false, outline = false }: PaperProps) => {
  return css`
    border: ${outline ? `1px solid gray` : 'none'};
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    box-shadow: ${getBoxShadowValue(elevation, 1)};
    border-radius: ${square ? 0 : 3}px;
  `;
};
