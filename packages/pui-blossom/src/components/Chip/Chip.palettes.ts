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

export const PALETTE_MAP_PLAIN = {
  primary: {
    text: {
      normal: Colors.White,
      hover: Colors.White,
      active: Colors.White,
    },
    bg: {
      normal: Colors.MaximumBlue,
      hover: Colors.Shakespeare,
      active: Colors.Allports,
    },
    border: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
  },
  secondary: {
    text: {
      normal: Colors.White,
      hover: Colors.White,
      active: Colors.White,
    },
    bg: {
      normal: Colors.MineShaft,
      hover: Colors.GraniteGray,
      active: Colors.Black,
    },
    border: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
  },
  success: {
    text: {
      normal: Colors.Black,
      hover: Colors.Black,
      active: Colors.Black,
    },
    bg: {
      normal: Colors.UFOGreen,
      hover: Colors.VeryLightMalachiteGreen,
      active: Colors.PantoneGreen,
    },
    border: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
  },
  warning: {
    text: {
      normal: Colors.Black,
      hover: Colors.Black,
      active: Colors.Black,
    },
    bg: {
      normal: Colors.BrightSun,
      hover: Colors.Kournikova,
      active: Colors.UCLAGold,
    },
    border: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
  },
  danger: {
    text: {
      normal: Colors.Black,
      hover: Colors.Black,
      active: Colors.Black,
    },
    bg: {
      normal: Colors.Tomato,
      hover: Colors.Salmon,
      active: Colors.FerrariRed,
    },
    border: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
  },
};

export const PALETTE_MAP_OUTLINE = {
  primary: {
    text: {
      normal: Colors.MaximumBlue,
      hover: Colors.Shakespeare,
      active: Colors.Allports,
    },
    bg: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: Colors.MaximumBlue,
      hover: Colors.Shakespeare,
      active: Colors.Allports,
    },
  },
  secondary: {
    text: {
      normal: Colors.MineShaft,
      hover: Colors.GraniteGray,
      active: Colors.Black,
    },
    bg: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: Colors.MineShaft,
      hover: Colors.GraniteGray,
      active: Colors.Black,
    },
  },
  success: {
    text: {
      normal: Colors.UFOGreen,
      hover: Colors.VeryLightMalachiteGreen,
      active: Colors.PantoneGreen,
    },
    bg: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: Colors.UFOGreen,
      hover: Colors.VeryLightMalachiteGreen,
      active: Colors.PantoneGreen,
    },
  },
  warning: {
    text: {
      normal: Colors.BrightSun,
      hover: Colors.Kournikova,
      active: Colors.UCLAGold,
    },
    bg: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: Colors.BrightSun,
      hover: Colors.Kournikova,
      active: Colors.UCLAGold,
    },
  },
  danger: {
    text: {
      normal: Colors.Tomato,
      hover: Colors.Salmon,
      active: Colors.FerrariRed,
    },
    bg: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: Colors.Tomato,
      hover: Colors.Salmon,
      active: Colors.FerrariRed,
    },
  },
};
