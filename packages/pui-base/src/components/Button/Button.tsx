import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { ButtonProps } from './Button.types';

import { getElementFromSlot } from '../../utils';

const Button = forwardRef(
  (
    { className, children, slots = {}, disabled = false, ...restProps }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const { startDecorator, endDecorator } = slots;

    const startDecoratorElement = getElementFromSlot(startDecorator, {
      className: 'Button-startDecorator',
      disabled,
    });

    const endDecoratorElement = getElementFromSlot(endDecorator, {
      className: 'Button-endDecorator',
      disabled,
    });

    return (
      <button
        {...restProps}
        ref={ref}
        className={cx('Button', { 'Button--disabled': disabled }, className)}
        disabled={disabled}
      >
        {startDecoratorElement}
        {children}
        {endDecoratorElement}
      </button>
    );
  },
);

export { Button };
