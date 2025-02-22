import { Colors } from '../../constants';

const NO_BORDER_STUB = {
  normal: 'transparent',
  disabled: 'transparent',
};

// SOFT

const SOFT_PRIMARY_COLORS = {
  bg: {
    normal: Colors.Primary100,
    hover: Colors.Primary200,
    active: Colors.Primary300,
    pressed: Colors.Primary300,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Primary700, disabled: Colors.Neutral400 },
};

const SOFT_NEUTRAL_COLORS = {
  bg: {
    normal: Colors.Neutral100,
    hover: Colors.Neutral200,
    active: Colors.Neutral300,
    pressed: Colors.Neutral300,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral700, disabled: Colors.Neutral400 },
};

const SOFT_SUCCESS_COLORS = {
  bg: {
    normal: Colors.Success100,
    hover: Colors.Success200,
    active: Colors.Success300,
    pressed: Colors.Success300,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Success700, disabled: Colors.Neutral400 },
};

const SOFT_WARNING_COLORS = {
  bg: {
    normal: Colors.Warning100,
    hover: Colors.Warning200,
    active: Colors.Warning300,
    pressed: Colors.Warning300,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Warning700, disabled: Colors.Neutral400 },
};

const SOFT_DANGER_COLORS = {
  bg: {
    normal: Colors.Danger100,
    hover: Colors.Danger200,
    active: Colors.Danger300,
    pressed: Colors.Danger300,
    disabled: Colors.Neutral50,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Danger700, disabled: Colors.Neutral400 },
};

// SOLID

const SOLID_PRIMARY_COLORS = {
  bg: {
    normal: Colors.Primary500,
    hover: Colors.Primary600,
    active: Colors.Primary700,
    pressed: Colors.Primary800,
    disabled: Colors.Neutral100,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.White, disabled: Colors.Neutral400 },
};

const SOLID_NEUTRAL_COLORS = {
  bg: {
    normal: Colors.Neutral500,
    hover: Colors.Neutral600,
    active: Colors.Neutral700,
    pressed: Colors.Neutral800,
    disabled: Colors.Neutral100,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.White, disabled: Colors.Neutral400 },
};

const SOLID_SUCCESS_COLORS = {
  bg: {
    normal: Colors.Success500,
    hover: Colors.Success600,
    active: Colors.Success700,
    pressed: Colors.Success800,
    disabled: Colors.Neutral100,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.White, disabled: Colors.Neutral400 },
};

const SOLID_WARNING_COLORS = {
  bg: {
    normal: Colors.Warning500,
    hover: Colors.Warning600,
    active: Colors.Warning700,
    pressed: Colors.Warning800,
    disabled: Colors.Neutral100,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.White, disabled: Colors.Neutral400 },
};

const SOLID_DANGER_COLORS = {
  bg: {
    normal: Colors.Danger500,
    hover: Colors.Danger600,
    active: Colors.Danger700,
    pressed: Colors.Danger800,
    disabled: Colors.Neutral100,
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.White, disabled: Colors.Neutral400 },
};

// OUTLINED

const OUTLINED_PRIMARY_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Primary200,
    active: Colors.Primary300,
    pressed: Colors.Primary400,
    disabled: 'transparent',
  },
  border: {
    normal: Colors.Primary800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Primary800, disabled: Colors.Neutral400 },
};

const OUTLINED_NEUTRAL_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Neutral200,
    active: Colors.Neutral300,
    pressed: Colors.Neutral400,
    disabled: 'transparent',
  },
  border: {
    normal: Colors.Neutral800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Neutral800, disabled: Colors.Neutral400 },
};

const OUTLINED_SUCCESS_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Success200,
    active: Colors.Success300,
    pressed: Colors.Success400,
    disabled: 'transparent',
  },
  border: {
    normal: Colors.Success800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Success800, disabled: Colors.Neutral400 },
};

const OUTLINED_WARNING_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Warning200,
    active: Colors.Warning300,
    pressed: Colors.Warning400,
    disabled: 'transparent',
  },
  border: {
    normal: Colors.Warning800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Warning800, disabled: Colors.Neutral400 },
};

const OUTLINED_DANGER_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Danger200,
    active: Colors.Danger300,
    pressed: Colors.Danger400,
    disabled: 'transparent',
  },
  border: {
    normal: Colors.Danger800,
    disabled: Colors.Neutral200,
  },
  text: { normal: Colors.Danger800, disabled: Colors.Neutral400 },
};

// PLAIN

const PLAIN_PRIMARY_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Primary100,
    active: Colors.Primary200,
    pressed: Colors.Primary300,
    disabled: 'transparent',
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Primary700, disabled: Colors.Neutral400 },
};

const PLAIN_NEUTRAL_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Neutral100,
    active: Colors.Neutral200,
    pressed: Colors.Neutral300,
    disabled: 'transparent',
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Neutral700, disabled: Colors.Neutral400 },
};

const PLAIN_SUCCESS_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Success100,
    active: Colors.Success200,
    pressed: Colors.Success300,
    disabled: 'transparent',
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Success700, disabled: Colors.Neutral400 },
};

const PLAIN_WARNING_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Warning100,
    active: Colors.Warning200,
    pressed: Colors.Warning300,
    disabled: 'transparent',
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Warning700, disabled: Colors.Neutral400 },
};

const PLAIN_DANGER_COLORS = {
  bg: {
    normal: 'transparent',
    hover: Colors.Danger100,
    active: Colors.Danger200,
    pressed: Colors.Danger300,
    disabled: 'transparent',
  },
  border: NO_BORDER_STUB,
  text: { normal: Colors.Danger700, disabled: Colors.Neutral400 },
};

export const COLOR_MAP = {
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
  plain: {
    primary: PLAIN_PRIMARY_COLORS,
    neutral: PLAIN_NEUTRAL_COLORS,
    success: PLAIN_SUCCESS_COLORS,
    warning: PLAIN_WARNING_COLORS,
    danger: PLAIN_DANGER_COLORS,
  },
};
