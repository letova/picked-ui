import { Colors } from '../../constants';

const NO_BORDER_STUB = {
  normal: 'transparent',
  checkedNormal: 'transparent',
  disabled: 'transparent',
};

// SOFT

const SOFT_PRIMARY_COLORS = {
  trackBg: {
    normal: Colors.Neutral100,
    hover: Colors.Neutral200,
    checkedNormal: Colors.Primary100,
    checkedHover: Colors.Primary200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Primary500,
    disabled: Colors.Neutral400,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOFT_NEUTRAL_COLORS = {
  trackBg: {
    normal: Colors.Neutral100,
    hover: Colors.Neutral200,
    checkedNormal: Colors.Neutral100,
    checkedHover: Colors.Neutral200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Neutral500,
    disabled: Colors.Neutral400,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOFT_SUCCESS_COLORS = {
  trackBg: {
    normal: Colors.Neutral100,
    hover: Colors.Neutral200,
    checkedNormal: Colors.Success100,
    checkedHover: Colors.Success200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Success500,
    disabled: Colors.Neutral400,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOFT_WARNING_COLORS = {
  trackBg: {
    normal: Colors.Neutral100,
    hover: Colors.Neutral200,
    checkedNormal: Colors.Warning100,
    checkedHover: Colors.Warning200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Warning500,
    disabled: Colors.Neutral400,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOFT_DANGER_COLORS = {
  trackBg: {
    normal: Colors.Neutral100,
    hover: Colors.Neutral200,
    checkedNormal: Colors.Danger100,
    checkedHover: Colors.Danger200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Danger500,
    disabled: Colors.Neutral400,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

// SOLID

const SOLID_PRIMARY_COLORS = {
  trackBg: {
    normal: Colors.Neutral500,
    hover: Colors.Neutral600,
    checkedNormal: Colors.Primary500,
    checkedHover: Colors.Primary600,
    disabled: Colors.Neutral200,
  },
  thumbBg: {
    normal: Colors.White,
    checkedNormal: Colors.White,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOLID_NEUTRAL_COLORS = {
  trackBg: {
    normal: Colors.Neutral500,
    hover: Colors.Neutral600,
    checkedNormal: Colors.Neutral500,
    checkedHover: Colors.Neutral600,
    disabled: Colors.Neutral200,
  },
  thumbBg: {
    normal: Colors.White,
    checkedNormal: Colors.White,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOLID_SUCCESS_COLORS = {
  trackBg: {
    normal: Colors.Neutral500,
    hover: Colors.Neutral600,
    checkedNormal: Colors.Success500,
    checkedHover: Colors.Success600,
    disabled: Colors.Neutral200,
  },
  thumbBg: {
    normal: Colors.White,
    checkedNormal: Colors.White,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOLID_WARNING_COLORS = {
  trackBg: {
    normal: Colors.Neutral500,
    hover: Colors.Neutral600,
    checkedNormal: Colors.Warning500,
    checkedHover: Colors.Warning600,
    disabled: Colors.Neutral200,
  },
  thumbBg: {
    normal: Colors.White,
    checkedNormal: Colors.White,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

const SOLID_DANGER_COLORS = {
  trackBg: {
    normal: Colors.Neutral500,
    hover: Colors.Neutral600,
    checkedNormal: Colors.Danger500,
    checkedHover: Colors.Danger600,
    disabled: Colors.Neutral200,
  },
  thumbBg: {
    normal: Colors.White,
    checkedNormal: Colors.White,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral600 },
};

// OUTLINED

const OUTLINED_PRIMARY_COLORS = {
  trackBg: {
    normal: 'transparent',
    hover: Colors.Neutral100,
    checkedNormal: 'transparent',
    checkedHover: Colors.Primary100,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Primary500,
    disabled: Colors.Neutral400,
  },
  border: {
    normal: Colors.Neutral800,
    checkedNormal: Colors.Primary800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Primary800, disabled: Colors.Neutral500 },
};

const OUTLINED_NEUTRAL_COLORS = {
  trackBg: {
    normal: 'transparent',
    hover: Colors.Neutral200,
    checkedNormal: 'transparent',
    checkedHover: Colors.Neutral200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Neutral500,
    disabled: Colors.Neutral400,
  },
  border: {
    normal: Colors.Neutral800,
    checkedNormal: Colors.Neutral800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral500 },
};

const OUTLINED_SUCCESS_COLORS = {
  trackBg: {
    normal: 'transparent',
    hover: Colors.Neutral200,
    checkedNormal: 'transparent',
    checkedHover: Colors.Success200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Success500,
    disabled: Colors.Neutral400,
  },
  border: {
    normal: Colors.Neutral800,
    checkedNormal: Colors.Success800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Success800, disabled: Colors.Neutral500 },
};

const OUTLINED_WARNING_COLORS = {
  trackBg: {
    normal: 'transparent',
    hover: Colors.Neutral200,
    checkedNormal: 'transparent',
    checkedHover: Colors.Warning200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Warning500,
    disabled: Colors.Neutral400,
  },
  border: {
    normal: Colors.Neutral800,
    checkedNormal: Colors.Warning800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Warning800, disabled: Colors.Neutral500 },
};

const OUTLINED_DANGER_COLORS = {
  trackBg: {
    normal: 'transparent',
    hover: Colors.Neutral200,
    checkedNormal: 'transparent',
    checkedHover: Colors.Danger200,
    disabled: Colors.Neutral50,
  },
  thumbBg: {
    normal: Colors.Neutral500,
    checkedNormal: Colors.Danger500,
    disabled: Colors.Neutral400,
  },
  border: {
    normal: Colors.Neutral800,
    checkedNormal: Colors.Danger800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Danger800, disabled: Colors.Neutral500 },
};

export const COLORS_MAP = {
  soft: {
    primary: SOFT_PRIMARY_COLORS,
    neutral: SOFT_NEUTRAL_COLORS,
    success: SOFT_SUCCESS_COLORS,
    warning: SOFT_WARNING_COLORS,
    danger: SOFT_DANGER_COLORS,
  },
  solid: {
    primary: SOLID_PRIMARY_COLORS,
    neutral: SOLID_NEUTRAL_COLORS,
    success: SOLID_SUCCESS_COLORS,
    warning: SOLID_WARNING_COLORS,
    danger: SOLID_DANGER_COLORS,
  },
  outlined: {
    primary: OUTLINED_PRIMARY_COLORS,
    neutral: OUTLINED_NEUTRAL_COLORS,
    success: OUTLINED_SUCCESS_COLORS,
    warning: OUTLINED_WARNING_COLORS,
    danger: OUTLINED_DANGER_COLORS,
  },
};
