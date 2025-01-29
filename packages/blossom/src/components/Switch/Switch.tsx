import { ForwardedRef, forwardRef } from 'react';
import { Switch as BaseSwitch } from '@picked-ui/base';

import { SwitchProps } from './Switch.types';
import { getCS } from './Switch.styles';

const Switch = forwardRef((props: SwitchProps, ref: ForwardedRef<HTMLElement>) => {
  const cs = getCS(props);

  return <BaseSwitch {...props} ref={ref} cs={cs} />;
});

export { Switch };
