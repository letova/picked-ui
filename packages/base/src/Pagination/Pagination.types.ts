import { CSSObject } from '@emotion/css';

export interface PaginationCS {
  container?: CSSObject;
}

export interface UsePaginationOptions {
  defaultPage?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  /**
   * @default 1
   */
  pageCount?: number;
  page?: number;
  /**
   * Number of always visible pages before and after the current page
   * @default 1
   */
  siblingCount?: number;
  /**
   * Number of always visible pages at the beginning and end
   * @default 1
   */
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  onPageChange?: (event: React.MouseEvent, nextPage: number) => void;
  onValuePageChange?: (nextPage: number) => void;
}

export interface PaginationProps extends UsePaginationOptions {
  'aria-label'?: string;
  /**
   * Class name applied to the root element
   */
  className?: string;
  cs?: PaginationCS;
  disabled?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: {
    label?: string;
    /**
     * @default [10, 25, 50, 100]
     */
    selectOptions?: number[];
    getSelectOptionLabel?: (itemsPerPage: number) => React.ReactNode;
  };
  onItemsPerPageChange?: (event: React.ChangeEvent, nextItemsPerPage: number) => void;
  onValueItemsPerPageChange?: (nextItemsPerPage: number) => void;
  showPageInput?: boolean;
  type?: 'numbered-buttons' | 'total-numbers';
}
