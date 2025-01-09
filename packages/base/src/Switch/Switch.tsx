import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useEffect, useId, useRef, useState } from 'react';

import { useFocus, useForkRef } from '../hooks';
import { convertCSToClassName, getElementFromSlot, isNil } from '../utils';

import { SwitchProps } from './Switch.types';

export const Switch = forwardRef(
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

    const labelElement = label
      ? getElementFromSlot(slots?.label || { component: 'label' }, {
          className: cx('Switch-label', convertCSToClassName(cs?.label, state)),
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
          'Switch',
          {
            'Switch--checked': checked,
            'Switch--disabled': disabled,
            'Switch--focus': hasFocus,
            'Switch--focusVisible': hasFocusVisible,
          },
          convertCSToClassName(cs?.container, state),
          className,
        )}
      >
        <span className="Switch-track">
          <span className="Switch-thumb" />
        </span>
        <span className={cx('Switch-action', convertCSToClassName(cs?.action, state))}>
          <input
            {...restInputProps}
            ref={handleInputRef}
            id={id}
            className={cx('Switch-input', convertCSToClassName(cs?.input, state))}
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
        {labelElement}
      </span>
    );
  },
);
