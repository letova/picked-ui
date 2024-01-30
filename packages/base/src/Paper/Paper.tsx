import { css, cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { PaperProps } from './Paper.types';

export const Paper = forwardRef(
  ({ className, children, elevation = 1, cs }: PaperProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={cx(
          'Paper',
          `Paper--elevation${elevation}`,
          { [css(cs?.container)]: Boolean(cs?.container) },
          className,
        )}
        children={children}
      />
    );
  },
);
