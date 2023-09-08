import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { Chip as BaseChip } from '../../../../pui-base/src/components/Chip';

import { ChipProps } from './Chip.types';
import { getCS, getClassName } from './Chip.styles';

const Chip = forwardRef((props: ChipProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const cs = getCS(props);

  return <BaseChip ref={ref} {...restProps} className={cx(className, getClassName(props))} cs={cs} />;
});

export { Chip };
