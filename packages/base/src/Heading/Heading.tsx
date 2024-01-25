import { css, cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef } from 'react';

import { HeadingProps } from './Heading.types';

export const Heading = forwardRef(
  ({ className, children, level = 2, as, cs }: HeadingProps, ref: ForwardedRef<HTMLDivElement>) => {
    if (typeof level === 'number' && (level < 1 || level > 6)) {
      throw new Error('PUI | Heading component: the level of a Heading must be positive value between one and six');
    }

    const props = {
      ref,
      className: cx('Heading', `Heading--level${level}`, { [css(cs?.container)]: Boolean(cs?.container) }, className),
    };

    if (as) {
      return React.createElement(
        as,
        {
          ...props,
          role: 'heading',
          'aria-level': level,
        },
        children,
      );
    }

    return React.createElement(`h${level}`, props, children);
  },
);
