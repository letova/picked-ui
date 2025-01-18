import { cx, css } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';
import { Radio as BaseRadio } from '@picked-ui/base';

import { RadioIconProps, RadioProps } from './Radio.types';
import { getCheckedRadioIconStyle, getCS } from './Radio.styles';

const RadioIcon = ({ className, checked, checkedIcon, uncheckedIcon, checkedStyle }: RadioIconProps) => {
  if (checked) {
    return checkedIcon || <span className={cx(className, css(checkedStyle))} />;
  }

  return uncheckedIcon || null;
};

const Radio = forwardRef((props: RadioProps, ref: ForwardedRef<HTMLElement>) => {
  const { className, checkedIcon, uncheckedIcon, ...restProps } = props;
  const cs = getCS(props);

  return (
    <BaseRadio
      ref={ref}
      className={className}
      {...restProps}
      slots={{
        icon: {
          component: RadioIcon,
          props: { checkedIcon, uncheckedIcon, checkedStyle: getCheckedRadioIconStyle(props) },
        },
        ...restProps.slots,
      }}
      cs={cs}
    />
  );
});

export { Radio };
