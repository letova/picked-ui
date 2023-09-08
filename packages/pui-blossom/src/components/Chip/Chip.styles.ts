import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';

import { ChipProps } from './Chip.types';

export const getClassName = ({ scale: s = 1 }: ChipProps) => {
  return css`
    position: relative;
    display: flex;
    align-items: center;
    gap: ${getPxSize(4, s)};
    padding: ${getPxSize(2, s)} ${getPxSize(4, s)};
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: ${getPxSize(14, s)};
    background: yellow;
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
