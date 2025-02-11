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
  normal: Colors.Primary500,
  hover: Colors.Primary600,
  active: Colors.Primary700,
};

const SOFT_BLUE_UNIT = {
  normal: Colors.Primary100,
  hover: Colors.Primary200,
  active: Colors.Primary300,
};

const GRAY_UNIT = {
  normal: Colors.Neutral500,
  hover: Colors.Neutral600,
  active: Colors.Neutral700,
};

const SOFT_GRAY_UNIT = {
  normal: Colors.Neutral100,
  hover: Colors.Neutral200,
  active: Colors.Neutral300,
};

const GREEN_UNIT = {
  normal: Colors.Success500,
  hover: Colors.Success600,
  active: Colors.Success700,
};

const SOFT_GREEN_UNIT = {
  normal: Colors.Success100,
  hover: Colors.Success200,
  active: Colors.Success300,
};

const YELLOW_UNIT = {
  normal: Colors.Warning500,
  hover: Colors.Warning600,
  active: Colors.Warning700,
};

const SOFT_YELLOW_UNIT = {
  normal: Colors.Warning100,
  hover: Colors.Warning200,
  active: Colors.Warning300,
};

const RED_UNIT = {
  normal: Colors.Danger500,
  hover: Colors.Danger600,
  active: Colors.Danger700,
};

const SOFT_RED_UNIT = {
  normal: Colors.Danger100,
  hover: Colors.Danger200,
  active: Colors.Danger300,
};

export const SOFT_PALETTE_MAP = {
  primary: {
    text: BLACK_UNIT,
    bg: SOFT_BLUE_UNIT,
    border: TRANSPARENT_UNIT,
  },
  neutral: {
    text: BLACK_UNIT,
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
    text: WHITE_UNIT,
    bg: GREEN_UNIT,
    border: TRANSPARENT_UNIT,
  },
  warning: {
    text: WHITE_UNIT,
    bg: YELLOW_UNIT,
    border: TRANSPARENT_UNIT,
  },
  danger: {
    text: WHITE_UNIT,
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
    bg: Colors.Neutral400,
    border: Colors.Neutral400,
  },
  solid: {
    text: Colors.White,
    bg: Colors.Neutral400,
    border: Colors.Neutral400,
  },
  outlined: {
    text: Colors.Neutral400,
    bg: Colors.White,
    border: Colors.Neutral400,
  },
};
