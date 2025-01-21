import { Colors } from '../../constants';

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

const SOFT_BLUE_UNIT = {
  normal: Colors.Sky,
  hover: Colors.BrilliantAzure,
  active: Colors.Blueberry,
};

const GRAY_UNIT = {
  normal: Colors.MineShaft,
  hover: Colors.GraniteGray,
  active: Colors.Black,
};

const SOFT_GRAY_UNIT = {
  normal: Colors.Silver,
  hover: Colors.Nobel,
  active: Colors.Stack,
};

const GREEN_UNIT = {
  normal: Colors.UFOGreen,
  hover: Colors.VeryLightMalachiteGreen,
  active: Colors.PantoneGreen,
};

const SOFT_GREEN_UNIT = {
  normal: Colors.TurquoiseGreen,
  hover: Colors.MediumAquamarine,
  active: Colors.VeryLightMalachiteGreen,
};

const YELLOW_UNIT = {
  normal: Colors.BrightSun,
  hover: Colors.Kournikova,
  active: Colors.UCLAGold,
};

const SOFT_YELLOW_UNIT = {
  normal: Colors.Peach,
  hover: Colors.Jasmine,
  active: Colors.Kournikova,
};

const RED_UNIT = {
  normal: Colors.Tomato,
  hover: Colors.Salmon,
  active: Colors.FerrariRed,
};

const SOFT_RED_UNIT = {
  normal: Colors.PastelPink,
  hover: Colors.LightSalmonPink,
  active: Colors.LightSalmonPink,
};

export const SOFT_PALETTE_MAP = {
  primary: {
    text: WHITE_UNIT,
    bg: SOFT_BLUE_UNIT,
    border: TRANSPARENT_UNIT,
  },
  neutral: {
    text: WHITE_UNIT,
    bg: SOFT_GRAY_UNIT,
    border: TRANSPARENT_UNIT,
  },
  success: {
    text: BLACK_UNIT,
    bg: SOFT_GREEN_UNIT,
    border: TRANSPARENT_UNIT,
  },
  warning: {
    text: BLACK_UNIT,
    bg: SOFT_YELLOW_UNIT,
    border: TRANSPARENT_UNIT,
  },
  danger: {
    text: BLACK_UNIT,
    bg: SOFT_RED_UNIT,
    border: TRANSPARENT_UNIT,
  },
};

export const SOLID_PALETTE_MAP = {
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

export const OUTLINED_PALETTE_MAP = {
  primary: {
    text: BLUE_UNIT,
    bg: TRANSPARENT_UNIT,
    border: BLUE_UNIT,
  },
  neutral: {
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

export const VARIANT_PALETTE_FOR_DISABLED_MAP = {
  soft: {
    text: Colors.White,
    bg: Colors.Nobel,
    border: Colors.Nobel,
  },
  solid: {
    text: Colors.White,
    bg: Colors.Nobel,
    border: Colors.Nobel,
  },
  outlined: {
    text: Colors.Nobel,
    bg: Colors.White,
    border: Colors.Nobel,
  },
};
