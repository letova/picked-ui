import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';
import { Checkbox as BaseCheckbox } from '@picked-ui/base';

import { CheckboxProps } from './Checkbox.types';
import { getClassName } from './Checkbox.styles';

const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<HTMLElement>) => {
  const { className, ...restProps } = props;

  return <BaseCheckbox ref={ref} className={cx(className, getClassName(props))} {...restProps} />;
});

export { Checkbox };
