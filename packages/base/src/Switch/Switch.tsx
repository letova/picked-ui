import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useEffect, useId, useRef, useState } from 'react';

import { useFocus, useForkRef } from '../hooks';
import { ClassNameGenerator, convertCSToClassName, getElementFromSlot, isNil } from '../utils';

import { SwitchProps } from './Switch.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Switch', element, modificator });

const getMCN = (modificator?: string) => ClassNameGenerator.generate({ block: 'Switch', modificator });

export const Switch = forwardRef(
  (
    {
      className,
      id: userId,
      name,
      value,
      label,
      inputProps,
      startDecorator,
      endDecorator,
      slots,
      cs,
      checked: userChecked,
      defaultChecked,
      disabled = false,
      autoFocus,
      onChange,
      onValueChange,
      onFocus,
      onBlur,
    }: SwitchProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { ref: inputRef, ...restInputProps } = inputProps || {};

    const ownerId = useId();
    const id = userId ?? ownerId;

    const ownerInputRef = useRef<HTMLInputElement>(null);
    const handleInputRef = useForkRef(inputRef, ownerInputRef);

    const [ownerChecked, setOwnerChecked] = useState(defaultChecked ?? false);

    const { hasFocus, hasFocusVisible, ...focusCallbacks } = useFocus({
      onFocus,
      onBlur,
    });

    const checked = isNil(userChecked) ? ownerChecked : userChecked;

    const state = {
      focus: hasFocus,
      focusVisible: hasFocusVisible,
      checked,
      disabled,
    };

    const startDecoratorElement = getElementFromSlot(slots?.startDecorator, {
      className: getCN('startDecorator'),
      ...state,
    });

    const endDecoratorElement = getElementFromSlot(slots?.endDecorator, {
      className: getCN('endDecorator'),
      ...state,
    });

    const trackContentElement = getElementFromSlot(slots?.trackContent, {
      className: cx(getCN('trackContent')),
      ...state,
    });

    const labelElement = label
      ? getElementFromSlot(slots?.label || { component: 'label' }, {
          className: cx(getCN('label'), convertCSToClassName(cs?.label, state)),
          children: label,
          htmlFor: id,
          ...state,
        })
      : null;

    useEffect(() => {
      if (autoFocus) {
        ownerInputRef.current?.focus();
      }
    }, [autoFocus]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const value = event.target.checked;

      if (isNil(userChecked)) {
        setOwnerChecked(value);
      }

      onChange?.(event);
      onValueChange?.(value);
    };

    return (
      <span
        ref={ref}
        className={cx(
          getCN(),
          {
            [getMCN('checked')]: checked,
            [getMCN('disabled')]: disabled,
            [getMCN('focus')]: hasFocus,
            [getMCN('focusVisible')]: hasFocusVisible,
          },
          convertCSToClassName(cs?.container, state),
          className,
        )}
      >
        {startDecoratorElement || startDecorator}
        <span className={cx(getCN('track'), convertCSToClassName(cs?.track, state))}>
          {trackContentElement}
          <span className={cx(getCN('thumb'), convertCSToClassName(cs?.thumb, state))} />
        </span>
        <span className={cx(getCN('action'), convertCSToClassName(cs?.action, state))}>
          <input
            {...restInputProps}
            ref={handleInputRef}
            id={id}
            className={cx(getCN('input'), convertCSToClassName(cs?.input, state))}
            role="switch"
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            {...focusCallbacks}
          />
        </span>
        {endDecoratorElement || endDecorator}
        {labelElement}
      </span>
    );
  },
);
