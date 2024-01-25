import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { Heading as BaseHeading } from '../../../../base/src/components/Heading';

import { HeadingProps } from './Heading.types';
import { getClassName } from './Heading.styles';

const Heading = forwardRef((props: HeadingProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return <BaseHeading ref={ref} className={cx(className, getClassName(props))} {...restProps} />;
});

export { Heading };
