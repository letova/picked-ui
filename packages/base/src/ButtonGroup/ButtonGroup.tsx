import { cx } from '@emotion/css';
import React, { forwardRef } from 'react';

import { ClassNameGenerator } from '../utils';

import { ButtonGroupProps } from './ButtonGroup.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'ButtonGroup', element, modificator });

export const ButtonGroup = forwardRef(({ className, children }: ButtonGroupProps) => {
  return (
    <div className={cx(getCN(), className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const props: Record<string, any> = {};

        if (React.Children.count(children) > 1) {
          if (index === 0) {
            props['data-first-child'] = '';
          }

          if (index === React.Children.count(children) - 1) {
            props['data-last-child'] = '';
          }
        }

        return React.cloneElement(child, props);
      })}
    </div>
  );
});
