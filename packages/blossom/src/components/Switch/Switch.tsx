import { ForwardedRef, forwardRef } from 'react';
import { Switch as BaseSwitch } from '@picked-ui/base';

import { SwitchProps } from './Switch.types';
import { getCS } from './Switch.styles';

const Switch = forwardRef((props: SwitchProps, ref: ForwardedRef<HTMLElement>) => {
  const { className, ...restProps } = props;
  const cs = getCS(props);

  return <BaseSwitch ref={ref} className={className} {...restProps} cs={cs} />;
});

export { Switch };
