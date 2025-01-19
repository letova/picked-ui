import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useState } from 'react';

import { ClassNameGenerator, getElementFromSlot } from '../utils';

import { ButtonProps } from './Button.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Button', element, modificator });

const getMCN = (modificator?: string) => ClassNameGenerator.generate({ block: 'Button', modificator });

export const Button = forwardRef(
  (
    {
      className,
      children,
      slots = {},
      startDecorator,
      endDecorator,
      highlighted = false,
      disabled = false,
      ...restProps
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const [hasFocus, setFocus] = useState(false);

    const startDecoratorElement = getElementFromSlot(slots.startDecorator, {
      className: getCN('startDecorator'),
      focus: hasFocus,
      highlighted,
      disabled,
    });

    const endDecoratorElement = getElementFromSlot(slots.endDecorator, {
      className: getCN('endDecorator'),
      focus: hasFocus,
      highlighted,
      disabled,
    });

    return (
      <button
        {...restProps}
        ref={ref}
        className={cx(
          getCN(),
          { [getMCN('focus')]: hasFocus, [getMCN('highlighted')]: highlighted, [getMCN('disabled')]: disabled },
          className,
        )}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        {startDecoratorElement || startDecorator}
        {children}
        {endDecoratorElement || endDecorator}
      </button>
    );
  },
);
