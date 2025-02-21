import { ForwardedRef, forwardRef } from 'react';
import { Splitter as BaseSplitter } from '@picked-ui/base';

import { SplitterProps } from './Splitter.types';

const Splitter = forwardRef((props: SplitterProps, ref: ForwardedRef<HTMLDivElement>) => {
  return <BaseSplitter {...props} ref={ref} />;
});

export { Splitter };
