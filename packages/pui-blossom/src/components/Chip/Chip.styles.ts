import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';

import { ChipProps } from './Chip.types';
import { PALETTE_MAP_OUTLINE, PALETTE_MAP_PLAIN } from './Chip.palettes';

const SIZES_MAP = {
  xs: {
    paddingX: 6,
    paddingY: 3,
    fontSize: 12,
  },
  s: {
    paddingX: 6,
    paddingY: 3,
    fontSize: 14,
  },
  m: {
    paddingX: 8,
    paddingY: 4,
    fontSize: 16,
  },
};

export const getClassName = ({
  variant = 'plain',
  size = 's',
  scale: s = 1,
  maxWidth,
  color = 'primary',
  onClick,
}: ChipProps) => {
  const paletteSource = variant === 'plain' ? PALETTE_MAP_PLAIN : PALETTE_MAP_OUTLINE;
  const palette = paletteSource[color];

  const sizes = SIZES_MAP[size];

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
    width: ${maxWidth ? getPxSize(maxWidth, s) : 'auto'};
    padding: ${getPxSize(sizes.paddingY, s)} ${getPxSize(sizes.paddingX, s)};
    border: ${borderStyle};
    border-radius: ${getPxSize(2, s)};
    box-sizing: border-box;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: ${getPxSize(sizes.fontSize, s)};
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

const LABEL_TEX_OVERFLOW_CS = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export const getCS = ({ maxWidth, cs }: ChipProps): ChipProps['cs'] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return deepMergeCS(
    {
      action: BUTTON_CS,
      label: maxWidth ? LABEL_TEX_OVERFLOW_CS : undefined,
    },
    cs,
  );
};
