import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';

import { ChipProps } from './Chip.types';
import { PALETTE_MAP_OUTLINE, PALETTE_MAP_PLAIN } from './Chip.palettes';

export const getClassName = ({ variant = 'plain', color = 'primary', scale: s = 1, onClick }: ChipProps) => {
  const paletteSource = variant === 'plain' ? PALETTE_MAP_PLAIN : PALETTE_MAP_OUTLINE;
  const palette = paletteSource[color];

  const borderStyle = variant === 'plain' ? 'none' : `${getPxSize(1, s)} solid ${palette.border.normal}`;

  const hoverStyle = onClick
    ? `
    &:hover { 
      background: ${palette.bg.hover};
      border-color: ${palette.border.hover};
      color: ${palette.text.hover};
    }
    &:active { 
      background: ${palette.bg.active};
      border-color: ${palette.border.active};
      color: ${palette.text.active};
    }
  `
    : '';

  return css`
    position: relative;
    display: flex;
    align-items: center;
    gap: ${getPxSize(4, s)};
    padding: ${getPxSize(3, s)} ${getPxSize(6, s)};
    border: ${borderStyle};
    border-radius: ${getPxSize(2, s)};
    box-sizing: border-box;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: ${getPxSize(14, s)};
    color: ${palette.text.normal};
    background: ${palette.bg.normal};
    ${hoverStyle}
  `;
};

const BUTTON_CS = {
  position: 'absolute',
  zIndex: 0,
  inset: 0,
  width: '100%',
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
};

export const getCS = ({ cs }: ChipProps): ChipProps['cs'] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return deepMergeCS(
    {
      action: BUTTON_CS,
    },
    cs,
  );
};
