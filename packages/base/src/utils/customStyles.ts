import { css } from '@emotion/css';

import { CustomStyle } from '../types';

export const convertCSToClassName = (cs: CustomStyle | undefined, state: Record<string, any> = {}) => {
  if (!cs) {
    return null;
  }

  if (typeof cs === 'function') {
    const receivedCs = cs(state);

    return receivedCs ? css(receivedCs) : null;
  }

  return css(cs);
};
