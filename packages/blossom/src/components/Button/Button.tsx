import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { Button as BaseButton } from '../../../../base/src/components/Button';

import { ButtonProps } from './Button.types';
import { getClassName } from './Button.styles';

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { className, ...restProps } = props;

  return <BaseButton ref={ref} className={cx(className, getClassName(props))} {...restProps} />;
});

export { Button };
