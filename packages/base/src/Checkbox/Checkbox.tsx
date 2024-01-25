import { cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef, useEffect, useId, useRef, useState } from 'react';

import { convertCSToClassName, isNil } from '../utils';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef(
  (
    {
      className,
      name,
      value,
      label,
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
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const [ownerChecked, setOwnerChecked] = useState(defaultChecked ?? false);
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const checked = isNil(userChecked) ? ownerChecked : userChecked;

    useEffect(() => {
      if (autoFocus) {
        inputRef.current?.focus();
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

    const state = {
      focus: hasFocus,
      indeterminate,
      checked,
      disabled,
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
        <span>
          <input
            ref={inputRef}
            id={id}
            type="checkbox"
            name={name}
            value={value}
            checked={userChecked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <span
            className={cx('Checkbox-customInput', {
              'Checkbox-customInput--focus': hasFocus,
              'Checkbox-customInput--indeterminate': indeterminate,
              'Checkbox-customInput--checked': checked,
              'Checkbox-customInput--disabled': disabled,
            })}
          />
        </span>
        {label ? (
          <label htmlFor={id} className={cx('Checkbox-label', convertCSToClassName(cs?.label, state))}>
            {label}
          </label>
        ) : null}
      </span>
    );
  },
);
