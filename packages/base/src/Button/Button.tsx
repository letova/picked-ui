import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useState } from 'react';

import { getElementFromSlot } from '../utils';

import { ButtonProps } from './Button.types';

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
      className: 'Button-startDecorator',
      focus: hasFocus,
      highlighted,
      disabled,
    });

    const endDecoratorElement = getElementFromSlot(slots.endDecorator, {
      className: 'Button-endDecorator',
      focus: hasFocus,
      highlighted,
      disabled,
    });

    return (
      <button
        {...restProps}
        ref={ref}
        className={cx(
          'Button',
          { 'Button--focus': hasFocus, 'Button--highlighted': highlighted, 'Button--disabled': disabled },
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
