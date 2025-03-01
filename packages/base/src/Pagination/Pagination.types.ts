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
   * @default 0
   */
  pageCount?: number;
  page?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPageInput?: boolean;
  type?: 'numbered-buttons' | 'total-numbers';
}
