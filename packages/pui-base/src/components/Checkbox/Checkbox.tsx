import { cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef, useId, useState } from 'react';

import { convertCSToClassName, isNil } from '../../utils';

import { CheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef(
  (
    {
      className,
      children,
      cs,
      indeterminate = false,
      checked: userChecked,
      defaultChecked = false,
      disabled = false,
      onChange,
    }: CheckboxProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const id = useId();
    const [ownerChecked, setOwnerChecked] = useState(defaultChecked);

    const checked = isNil(userChecked) ? ownerChecked : userChecked;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const value = event.target.checked;

      if (isNil(userChecked)) {
        setOwnerChecked(value);
      }

      onChange?.(event);
    };

    const state = {
      indeterminate,
      checked,
      disabled,
    };

    return (
      <div
        ref={ref}
        className={cx(
          'Checkbox',
          {
            'Checkbox--disabled': disabled,
          },
          convertCSToClassName(cs?.container, state),
          className,
        )}
      >
        <span>
          <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={handleChange} />
          <span
            className={cx('Checkbox-customInput', {
              'Checkbox-customInput--indeterminate': indeterminate,
              'Checkbox-customInput--checked': checked,
              'Checkbox-customInput--disabled': disabled,
            })}
          />
        </span>
        <label htmlFor={id} className={cx('Checkbox-label', convertCSToClassName(cs?.label, state))}>
          {children}
        </label>
      </div>
    );
  },
);

export { Checkbox };
