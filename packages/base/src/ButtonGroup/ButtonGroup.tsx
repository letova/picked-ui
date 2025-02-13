/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cx } from '@emotion/css';
import React, { forwardRef } from 'react';

import { Button, ButtonProps } from '../Button';

import { ClassNameGenerator } from '../utils';

import { ButtonGroupProps } from './ButtonGroup.types';

interface ExtraProps {
  default?: ButtonProps;
  overrides: ButtonProps;
}

type ButtonGroupComponent = ((p: ButtonGroupProps & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement) & {
  Button: React.FC<ButtonProps & { extraProps: ExtraProps }>;
};

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'ButtonGroup', element, modificator });

export const ButtonGroup = forwardRef(({ className, children, defaultProps, overridesProps }: ButtonGroupProps) => {
  return (
    <div className={cx(getCN(), className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const extraProps: ExtraProps = {
          default: defaultProps,
          overrides: overridesProps ?? {},
        };

        if (React.Children.count(children) > 1) {
          if (index === 0) {
            // @ts-ignore fix this
            extraProps.overrides['data-first-child'] = '';
          }

          if (index === React.Children.count(children) - 1) {
            // @ts-ignore fix this
            extraProps.overrides['data-last-child'] = '';
          }
        }

        const props = { extraProps };

        return React.cloneElement(child, props);
      })}
    </div>
  );
}) as unknown as ButtonGroupComponent;

ButtonGroup.Button = (props) => {
  const { extraProps, ...restProps } = props;

  const mergedProps = {
    ...extraProps.default,
    ...restProps,
    ...extraProps.overrides,
  };

  return <Button {...mergedProps} />;
};
