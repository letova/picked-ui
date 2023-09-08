import { CSSObject, css } from '@emotion/css';

type GetCSSObjectFn = (state: Record<string, any>) => CSSObject;

export const convertCSToClassName = (cs: CSSObject | GetCSSObjectFn | undefined, state: Record<string, any> = {}) => {
  if (!cs) {
    return null;
  }

  if (typeof cs === 'function') {
    const receivedCs = cs(state);

    return receivedCs ? css(receivedCs) : null;
  }

  return css(cs);
};
