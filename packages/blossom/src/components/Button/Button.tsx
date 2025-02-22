import { ForwardedRef, forwardRef } from 'react';
import { Button as BaseButton } from '@picked-ui/base';

import { deepMergeCS } from '../../utils';

import { ButtonProps } from './Button.types';
import { getCS } from './Button.styles';

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const cs = getCS(props);

  return <BaseButton {...props} ref={ref} cs={props.cs ? deepMergeCS(cs, props.cs) : cs} />;
});

export { Button };
