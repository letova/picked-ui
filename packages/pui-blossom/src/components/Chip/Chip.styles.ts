import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';

import { ChipProps } from './Chip.types';

enum Colors {
  White = '#fff',
  Black = '#000',
  GraniteGray = '#666666',
  MineShaft = '#323232',
  Shakespeare = '#61b1d0',
  MaximumBlue = '#3ba6d0',
  Allports = '#0d75a0',
  VeryLightMalachiteGreen = '#63db91',
  UFOGreen = '#38dc74',
  PantoneGreen = '#06b845',
  Kournikova = '#ffd673',
  BrightSun = '#ffc840',
  UCLAGold = '#feb603',
  Salmon = '#ff8b73',
  Tomato = '#ff6240',
  FerrariRed = '#ff2b00',
}

const PALETTE_MAP = {
  primary: {
    text: {
      normal: Colors.White,
    },
    bg: {
      normal: Colors.MaximumBlue,
      hover: Colors.Shakespeare,
      active: Colors.Allports,
    },
  },
  secondary: {
    text: {
      normal: Colors.White,
    },
    bg: {
      normal: Colors.MineShaft,
      hover: Colors.GraniteGray,
      active: Colors.Black,
    },
  },
  success: {
    text: {
      normal: Colors.Black,
    },
    bg: {
      normal: Colors.UFOGreen,
      hover: Colors.VeryLightMalachiteGreen,
      active: Colors.PantoneGreen,
    },
  },
  warning: {
    text: {
      normal: Colors.Black,
    },
    bg: {
      normal: Colors.BrightSun,
      hover: Colors.Kournikova,
      active: Colors.UCLAGold,
    },
  },
  danger: {
    text: {
      normal: Colors.Black,
    },
    bg: {
      normal: Colors.Tomato,
      hover: Colors.Salmon,
      active: Colors.FerrariRed,
    },
  },
};

export const getClassName = ({ color = 'primary', scale: s = 1, onClick }: ChipProps) => {
  const palette = PALETTE_MAP[color];

  const hoverStyle = onClick
    ? `
    &:hover { 
      background: ${palette.bg.hover};
    }
    &:active { 
      background: ${palette.bg.active};
    }
  `
    : '';

  return css`
    position: relative;
    display: flex;
    align-items: center;
    gap: ${getPxSize(4, s)};
    padding: ${getPxSize(3, s)} ${getPxSize(6, s)};
    border-radius: ${getPxSize(2, s)};
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
