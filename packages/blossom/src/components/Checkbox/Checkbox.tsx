import { ForwardedRef, forwardRef } from 'react';
import { Checkbox as BaseCheckbox } from '@picked-ui/base';

import { Check } from '../../iconComponents/Check';
import { Remove } from '../../iconComponents/Remove';

import { CheckboxIconProps, CheckboxProps } from './Checkbox.types';
import { getCS } from './Checkbox.styles';

const CheckboxIcon = ({
  className,
  checked,
  disabled,
  indeterminate,
  checkedIcon,
  disableIcon,
  indeterminateIcon,
  uncheckedIcon,
}: CheckboxIconProps) => {
  if (disabled && disableIcon) {
    return disableIcon;
  }

  if (checked) {
    return checkedIcon || <Check className={className} />;
  }

  if (indeterminate) {
    return indeterminateIcon || <Remove className={className} />;
  }

  return uncheckedIcon || null;
};

const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<HTMLElement>) => {
  const { className, checkedIcon, disableIcon, indeterminateIcon, uncheckedIcon, ...restProps } = props;
  const cs = getCS(props);

  return (
    <BaseCheckbox
      ref={ref}
      className={className}
      {...restProps}
      slots={{
        icon: { component: CheckboxIcon, props: { checkedIcon, disableIcon, indeterminateIcon, uncheckedIcon } },
        ...restProps.slots,
      }}
      cs={cs}
    />
  );
});

export { Checkbox };
