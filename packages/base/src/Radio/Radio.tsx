import { cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef, useId, useRef, useState } from 'react';

import { useFocus, useForkRef } from '../hooks';
import { convertCSToClassName, getElementFromSlot, isNil } from '../utils';

import { RadioProps } from './Radio.types';

export const Radio = forwardRef(
  (
    {
      className,
      id: userId,
      name,
      value,
      label,
      inputProps,
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
    }: RadioProps,
    ref: ForwardedRef<HTMLSpanElement>,
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

    const iconElement = getElementFromSlot(slots?.icon, {
      className: cx('Radio-icon', convertCSToClassName(cs?.icon, state)),
      ...state,
    });

    const labelElement = label
      ? getElementFromSlot(
          { component: 'label', ...slots?.label },
          {
            className: cx('Radio-label', convertCSToClassName(cs?.label, state)),
            children: label,
            htmlFor: id,
            ...state,
          },
        )
      : null;

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
          'Radio',
          {
            'Radio--checked': checked,
            'Radio--disabled': disabled,
            'Radio--focus': hasFocus,
            'Radio--focusVisible': hasFocusVisible,
          },
          convertCSToClassName(cs?.container, state),
          className,
        )}
      >
        <span className={cx('Radio-inputContainer', convertCSToClassName(cs?.inputContainer, state))}>
          <span className={cx('Radio-action', convertCSToClassName(cs?.action, state))}>
            <input
              {...restInputProps}
              ref={handleInputRef}
              id={id}
              className={cx('Radio-input', convertCSToClassName(cs?.input, state))}
              type="radio"
              name={name}
              value={value}
              checked={checked}
              defaultChecked={defaultChecked}
              disabled={disabled}
              autoFocus={autoFocus}
              onChange={handleChange}
              {...focusCallbacks}
            />
          </span>
          {iconElement}
        </span>
        {labelElement}
      </span>
    );
  },
);
