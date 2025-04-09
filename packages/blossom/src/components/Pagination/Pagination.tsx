import { ForwardedRef, forwardRef } from 'react';
import { Pagination as BasePagination } from '@picked-ui/base';

import { PaginationProps } from './Pagination.types';
import { getCS } from './Pagination.styles';

const Pagination = forwardRef((props: PaginationProps, ref: ForwardedRef<HTMLElement>) => {
  const cs = getCS();

  return <BasePagination {...props} ref={ref} cs={cs} />;
});

export { Pagination };
