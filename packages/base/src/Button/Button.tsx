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
      slots = {},
      startDecorator,
      endDecorator,
      cs,
      highlighted = false,
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
      highlighted,
      disabled,
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
        className={cx(
          getCN(),
          {
            [getMCN('highlighted')]: highlighted,
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
