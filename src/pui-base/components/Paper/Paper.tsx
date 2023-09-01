import { ForwardedRef, forwardRef } from 'react';

import { PaperProps } from './Paper.types';
import { cx } from '@emotion/css';

const Paper = forwardRef(
  ({ className, children, elevation = 1, customStyles }: PaperProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={cx('Paper', `Paper--elevation${elevation}`, className)}
        children={children}
        style={customStyles?.container}
      />
    );
  },
);

export { Paper };
