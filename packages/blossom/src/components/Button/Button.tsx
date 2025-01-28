import { ForwardedRef, forwardRef } from 'react';
import { Button as BaseButton } from '@picked-ui/base';

import { ButtonProps } from './Button.types';
import { getCS } from './Button.styles';

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const cs = getCS(props);

  return <BaseButton {...props} ref={ref} cs={cs} />;
});

export { Button };
