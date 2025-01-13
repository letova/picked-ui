import { cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef, useId, useState } from 'react';

import { useFocus } from '../hooks';
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
      onValueChange,
      onFocus,
      onBlur,
    }: CheckboxProps,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    const { ref: inputRef, ...restInputProps } = inputProps || {};

    const ownerId = useId();
    const id = userId ?? ownerId;

    const [ownerChecked, setOwnerChecked] = useState(defaultChecked ?? false);

    const { hasFocus, hasFocusVisible, ...focusCallbacks } = useFocus({
      onFocus,
      onBlur,
    });

    const checked = isNil(userChecked) ? ownerChecked : userChecked;

    const state = {
      focus: hasFocus,
      focusVisible: hasFocusVisible,
      indeterminate,
      checked,
      disabled,
    };

    const iconElement = getElementFromSlot(slots?.icon, {
      className: cx('Checkbox-icon', convertCSToClassName(cs?.icon, state)),
      ...state,
    });

    const labelElement = label
      ? getElementFromSlot(
          { component: 'label', ...slots?.label },
          {
            className: cx('Checkbox-label', convertCSToClassName(cs?.label, state)),
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
          'Checkbox',
          {
            'Checkbox--checked': checked,
            'Checkbox--disabled': disabled,
            'Checkbox--focus': hasFocus,
            'Checkbox--focusVisible': hasFocusVisible,
            'Checkbox--indeterminate': indeterminate,
          },
          convertCSToClassName(cs?.container, state),
          className,
        )}
      >
        <span className={cx('Checkbox-inputContainer', convertCSToClassName(cs?.inputContainer, state))}>
          <span className={cx('Checkbox-action', convertCSToClassName(cs?.action, state))}>
            <input
              {...restInputProps}
              ref={inputRef}
              id={id}
              className={cx('Checkbox-input', convertCSToClassName(cs?.input, state))}
              type="checkbox"
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
