export interface PaginationProps {
  'aria-label'?: string;
  /**
   * Class name applied to the root element
   */
  className?: string;
  defaultPage?: number;
  disabled?: boolean;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
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
  onPageChange?: (event: React.ChangeEvent, nextPage: number) => void;
  onValueItemsPerPageChange?: (nextItemsPerPage: number) => void;
  onValuePageChange?: (nextPage: number) => void;
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
  showPageInput?: boolean;
  type?: 'numbered-buttons' | 'total-numbers';
}
