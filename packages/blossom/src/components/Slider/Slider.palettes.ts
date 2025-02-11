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
  normal: Colors.Primary500,
  hover: Colors.Primary600,
  active: Colors.Primary700,
};

const GRAY_UNIT = {
  normal: Colors.Neutral500,
  hover: Colors.Neutral600,
  active: Colors.Neutral700,
};

const GREEN_UNIT = {
  normal: Colors.Success500,
  hover: Colors.Success600,
  active: Colors.Success700,
};

const YELLOW_UNIT = {
  normal: Colors.Warning500,
  hover: Colors.Warning600,
  active: Colors.Warning700,
};

const RED_UNIT = {
  normal: Colors.Danger500,
  hover: Colors.Danger600,
  active: Colors.Danger700,
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
  bg: Colors.Neutral400,
  border: Colors.Neutral400,
};