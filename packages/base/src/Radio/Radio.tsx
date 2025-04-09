import { cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef, useId, useState } from 'react';

import { useFocus } from '../hooks';
import { ClassNameGenerator, convertCSToClassName, getElementFromSlot, isNil } from '../utils';

import { RadioProps } from './Radio.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Radio', element, modificator });

const getMCN = (modificator?: string) => ClassNameGenerator.generate({ block: 'Radio', modificator });

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
      readOnlyState = false,
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
      className: cx(getCN('icon'), convertCSToClassName(cs?.icon, state)),
      ...state,
    });

    const labelElement = label
      ? getElementFromSlot(
          { component: 'label', ...slots?.label },
          {
            className: cx(getCN('label'), convertCSToClassName(cs?.label, state)),
            children: label,
            htmlFor: id,
            ...state,
          },
        )
      : null;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      if (readOnlyState) {
        return;
      }

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
        <span className={cx(getCN('inputContainer'), convertCSToClassName(cs?.inputContainer, state))}>
          <span className={cx(getCN('action'), convertCSToClassName(cs?.action, state))}>
            <input
              {...restInputProps}
              ref={inputRef}
              id={id}
              className={cx(getCN('input'), convertCSToClassName(cs?.input, state))}
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
