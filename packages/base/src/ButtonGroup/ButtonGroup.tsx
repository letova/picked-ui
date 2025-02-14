import { cx } from '@emotion/css';
import React, { forwardRef } from 'react';

import { Button, ButtonProps } from '../Button';

import { DataAttributes } from '../types';
import { ClassNameGenerator } from '../utils';

import { ButtonGroupComponent, ButtonGroupCustom, ButtonGroupProps } from './ButtonGroup.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'ButtonGroup', element, modificator });

export const ButtonGroup = forwardRef(({ className, children, defaultProps }: ButtonGroupProps) => {
  return (
    <div className={cx(getCN(), className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const custom: ButtonGroupCustom = {
          ...(child.props as ButtonProps).custom,
          defaultProps: defaultProps,
        };

        const overridesProps: ButtonProps & DataAttributes = {};

        if (React.Children.count(children) > 1) {
          if (index === 0) {
            overridesProps['data-first-child'] = '';
          }

          if (index === React.Children.count(children) - 1) {
            overridesProps['data-last-child'] = '';
          }
        }

        const props = { ...overridesProps, custom };

        return React.cloneElement(child, props);
      })}
    </div>
  );
}) as unknown as ButtonGroupComponent;

ButtonGroup.Button = (props) => {
  const { custom, ...restProps } = props;

  const { defaultProps, ...userCustom } = custom as {
    defaultProps: ButtonProps;
    [x: string]: unknown;
  };

  const mergedProps = {
    ...defaultProps,
    ...restProps,
    custom: userCustom,
  };

  return <Button {...mergedProps} />;
};
