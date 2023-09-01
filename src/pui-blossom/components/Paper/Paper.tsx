import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { Paper as BasePaper } from '../../../pui-base/components/Paper';

import { PaperProps } from './Paper.types';
import { getClassName } from './Paper.styles';

const Paper = forwardRef((props: PaperProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return <BasePaper ref={ref} className={cx(className, getClassName(props))} {...restProps} />;
});

export { Paper };
