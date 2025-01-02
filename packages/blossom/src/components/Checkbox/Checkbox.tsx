import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';
import { Checkbox as BaseCheckbox } from '@picked-ui/base';

import { Check } from '../../iconComponents/Check';

import { CheckboxIconProps, CheckboxProps } from './Checkbox.types';
import { getClassName, getCS } from './Checkbox.styles';

const CheckboxIcon = ({ className, checked, indeterminate }: CheckboxIconProps) => {
  if (checked) {
    return <Check className={className} />;
  }

  if (indeterminate) {
    return <span>X</span>;
  }

  return null;
};

const checkboxIconSlot = { component: CheckboxIcon };

const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<HTMLElement>) => {
  const { className, ...restProps } = props;
  const cs = getCS(props);

  return (
    <BaseCheckbox
      ref={ref}
      className={cx(className, getClassName(props))}
      {...restProps}
      slots={{
        icon: checkboxIconSlot,
        ...restProps.slots,
      }}
      cs={cs}
    />
  );
});

export { Checkbox };
