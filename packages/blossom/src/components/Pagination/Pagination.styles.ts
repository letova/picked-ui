import { Colors } from '../../constants';

import { PaginationProps } from './Pagination.types';

export const getCS = (): PaginationProps['cs'] => {
  return {
    container: {
      background: Colors.Neutral200,
    },
  };
};
