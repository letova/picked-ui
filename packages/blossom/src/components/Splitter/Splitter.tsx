import { ForwardedRef, forwardRef } from 'react';
import { Splitter as BaseSplitter } from '@picked-ui/base';

import { getCS } from './Splitter.styles';
import { SplitterProps } from './Splitter.types';

const Splitter = forwardRef((props: SplitterProps, ref: ForwardedRef<HTMLDivElement>) => {
  const cs = getCS(props);

  return <BaseSplitter {...props} ref={ref} cs={cs} />;
});

export { Splitter };
