import { Colors } from "../../constants";

const TRANSPARENT_UNIT = {
  normal: 'transparent',
  hover: 'transparent',
  active: 'transparent',
  disabled: 'transparent',
};

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

export const PALETTE_MAP = {
  primary: {
    text: WHITE_UNIT,
    bg: BLUE_UNIT,
    border: TRANSPARENT_UNIT,
  },
  neutral: {
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

export const PALETTE_FOR_DISABLED_MAP = {
  text: Colors.White,
  bg: Colors.Nobel,
  border: Colors.Nobel,
};