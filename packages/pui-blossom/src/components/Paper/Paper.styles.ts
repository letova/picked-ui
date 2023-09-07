import { css } from '@emotion/css';

import { getPxSize, getRemSize } from '../../utils';

import { PaperProps } from './Paper.types';

export enum Colors {
  SemitransparentBlack05 = 'rgba(0, 0, 0, 0.05)',
  SemitransparentBlack10 = 'rgba(0, 0, 0, 0.1)',
  SemitransparentBlack15 = 'rgba(0, 0, 0, 0.15)',
}

/**
 * box-shadow: offset-x | offset-y | blur-radius | spread-radius | color
 */
const getBoxShadowValue = (elevation: number, s: number) => {
  if (elevation === 0) {
    return 'none';
  }

  const boxShadowLayer1 = `0 
  ${getPxSize(1 * elevation, s)} 
  ${getPxSize(0.5 * elevation, s)} 
  ${getPxSize(Math.round(-0.4 * elevation), s)} ${Colors.SemitransparentBlack10}`;

  const boxShadowLayer2 = `0 
  ${getPxSize(1.5 * elevation, s)} 
  ${getPxSize(1 * elevation, s)} 
  ${getPxSize(0.5, s)} ${Colors.SemitransparentBlack15}`;

  const boxShadowLayer3 = `
  0 
  ${getPxSize(2, s)} 
  ${getPxSize(2 * elevation, s)} 
  ${getPxSize(1 * elevation, s)} ${Colors.SemitransparentBlack05}`;

  return `${boxShadowLayer1}, ${boxShadowLayer2}, ${boxShadowLayer3}`;
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
