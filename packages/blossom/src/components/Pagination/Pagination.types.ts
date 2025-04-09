import { PaginationProps as BasePaginationProps } from '@picked-ui/base';

export interface PaginationProps extends BasePaginationProps {
  size?: 'xs' | 's' | 'm';
  scale?: number;
}
