import { css, cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { ClassNameGenerator } from '../utils';

import { PaperProps } from './Paper.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Paper', element, modificator });

const getMCN = (modificator?: string) => ClassNameGenerator.generate({ block: 'Paper', modificator });

export const Paper = forwardRef(
  ({ className, children, elevation = 1, cs }: PaperProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={cx(
          getCN(),
          getMCN(`elevation${elevation}`),
          { [css(cs?.container)]: Boolean(cs?.container) },
          className,
        )}
        children={children}
      />
    );
  },
);
