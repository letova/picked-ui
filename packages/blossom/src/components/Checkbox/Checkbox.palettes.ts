import { Colors } from '../../constants';

const WHITE_UNIT = {
  normal: Colors.White,
  hover: Colors.White,
  active: Colors.White,
};

const BLACK_UNIT = {
  normal: Colors.Black,
  hover: Colors.Black,
  active: Colors.Black,
};

const TRANSPARENT_UNIT = {
  normal: 'transparent',
  hover: 'transparent',
  active: 'transparent',
};

const BLUE_UNIT = {
  normal: Colors.MaximumBlue,
  hover: Colors.Shakespeare,
  active: Colors.Allports,
};

const GRAY_UNIT = {
  normal: Colors.MineShaft,
  hover: Colors.GraniteGray,
  active: Colors.Black,
};

const GREEN_UNIT = {
  normal: Colors.UFOGreen,
  hover: Colors.VeryLightMalachiteGreen,
  active: Colors.PantoneGreen,
};

const YELLOW_UNIT = {
  normal: Colors.BrightSun,
  hover: Colors.Kournikova,
  active: Colors.UCLAGold,
};

const RED_UNIT = {
  normal: Colors.Tomato,
  hover: Colors.Salmon,
  active: Colors.FerrariRed,
};

export const SOFT_PALETTE_MAP = {
  primary: {
    text: WHITE_UNIT,
    bg: BLUE_UNIT,
    border: TRANSPARENT_UNIT,
  },
  secondary: {
    text: WHITE_UNIT,
    bg: GRAY_UNIT,
    border: TRANSPARENT_UNIT,
  },
  success: {
    text: BLACK_UNIT,
    bg: GREEN_UNIT,
    border: TRANSPARENT_UNIT,
  },
  warning: {
    text: BLACK_UNIT,
    bg: YELLOW_UNIT,
    border: TRANSPARENT_UNIT,
  },
  danger: {
    text: BLACK_UNIT,
    bg: RED_UNIT,
    border: TRANSPARENT_UNIT,
  },
};

export const SOLID_PALETTE_MAP = {
  primary: {
    text: WHITE_UNIT,
    bg: BLUE_UNIT,
    border: TRANSPARENT_UNIT,
  },
  secondary: {
    text: WHITE_UNIT,
    bg: GRAY_UNIT,
    border: TRANSPARENT_UNIT,
  },
  success: {
    text: BLACK_UNIT,
    bg: GREEN_UNIT,
    border: TRANSPARENT_UNIT,
  },
  warning: {
    text: BLACK_UNIT,
    bg: YELLOW_UNIT,
    border: TRANSPARENT_UNIT,
  },
  danger: {
    text: BLACK_UNIT,
    bg: RED_UNIT,
    border: TRANSPARENT_UNIT,
  },
};

export const OUTLINED_PALETTE_MAP = {
  primary: {
    text: BLUE_UNIT,
    bg: TRANSPARENT_UNIT,
    border: BLUE_UNIT,
  },
  secondary: {
    text: GRAY_UNIT,
    bg: TRANSPARENT_UNIT,
    border: GRAY_UNIT,
  },
  success: {
    text: GREEN_UNIT,
    bg: TRANSPARENT_UNIT,
    border: GREEN_UNIT,
  },
  warning: {
    text: YELLOW_UNIT,
    bg: TRANSPARENT_UNIT,
    border: YELLOW_UNIT,
  },
  danger: {
    text: RED_UNIT,
    bg: TRANSPARENT_UNIT,
    border: RED_UNIT,
  },
};

export const VARIANT_PALETTE_MAP = {
  soft: SOFT_PALETTE_MAP,
  solid: SOLID_PALETTE_MAP,
  outlined: OUTLINED_PALETTE_MAP,
};
