import { cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef, useEffect, useId, useRef, useState } from 'react';

import { useForkRef } from '../hooks';
import { convertCSToClassName, getElementFromSlot, isNil } from '../utils';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef(
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
      indeterminate = false,
      checked: userChecked,
      defaultChecked,
      disabled = false,
      autoFocus,
      onChange,
      onFocus,
      onBlur,
    }: CheckboxProps,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    const { ref: inputRef, ...restInputProps } = inputProps || {};

    const ownerId = useId();
    const id = userId ?? ownerId;

    const ownerInputRef = useRef<HTMLInputElement>(null);
    const handleInputRef = useForkRef(inputRef, ownerInputRef);

    const [ownerChecked, setOwnerChecked] = useState(defaultChecked ?? false);
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const checked = isNil(userChecked) ? ownerChecked : userChecked;

    const state = {
      focus: hasFocus,
      indeterminate,
      checked,
      disabled,
    };

    const iconElement = getElementFromSlot(slots?.icon, {
      className: cx('Checkbox-icon', convertCSToClassName(cs?.icon, state)),
      ...state,
    });

    const labelElement = label
      ? getElementFromSlot(slots?.label || { component: 'label' }, {
          className: cx('Checkbox-label', convertCSToClassName(cs?.label, state)),
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
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      setHasFocus(true);
      onFocus?.(event);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      setHasFocus(false);
      onBlur?.(event);
    };

    return (
      <span
        ref={ref}
        className={cx(
          'Checkbox',
          {
            'Checkbox--focus': hasFocus,
            'Checkbox--indeterminate': indeterminate,
            'Checkbox--checked': checked,
            'Checkbox--disabled': disabled,
          },
          convertCSToClassName(cs?.container, state),
          className,
        )}
      >
        <span className={cx('Checkbox-inputContainer', convertCSToClassName(cs?.inputContainer, state))}>
          <input
            {...restInputProps}
            ref={handleInputRef}
            id={id}
            className={cx('Checkbox-input', convertCSToClassName(cs?.input, state))}
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {iconElement}
        </span>
        {labelElement}
      </span>
    );
  },
);
