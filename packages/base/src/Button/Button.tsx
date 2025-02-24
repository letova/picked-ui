import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { useFocus } from '../hooks';
import { ClassNameGenerator, convertCSToClassName, getElementFromSlot } from '../utils';

import { ButtonProps } from './Button.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Button', element, modificator });

const getMCN = (modificator?: string) => ClassNameGenerator.generate({ block: 'Button', modificator });

export const Button = forwardRef(
  (
    {
      className,
      children,
      custom,
      slots = {},
      startDecorator,
      endDecorator,
      cs,
      pressed,
      disabled = false,
      onFocus,
      onBlur,
      ...restProps
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const { hasFocus, hasFocusVisible, ...focusCallbacks } = useFocus({
      onFocus,
      onBlur,
    });

    const state = {
      focus: hasFocus,
      focusVisible: hasFocusVisible,
      pressed: !!pressed,
      disabled,
      custom,
    };

    const startDecoratorElement = getElementFromSlot(slots.startDecorator, {
      className: getCN('startDecorator'),
      ...state,
    });

    const endDecoratorElement = getElementFromSlot(slots.endDecorator, {
      className: getCN('endDecorator'),
      ...state,
    });

    return (
      <button
        {...restProps}
        ref={ref}
        // Identifies the button as a toggle button
        aria-pressed={pressed}
        className={cx(
          getCN(),
          {
            [getMCN('pressed')]: !!pressed,
            [getMCN('disabled')]: disabled,
            [getMCN('focus')]: hasFocus,
            [getMCN('focusVisible')]: hasFocusVisible,
          },
          convertCSToClassName(cs?.container, state),
          className,
        )}
        disabled={disabled}
        {...focusCallbacks}
      >
        {startDecoratorElement || startDecorator}
        {children}
        {endDecoratorElement || endDecorator}
      </button>
    );
  },
);
