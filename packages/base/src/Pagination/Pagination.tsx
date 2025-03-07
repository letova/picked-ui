import { useState } from 'react';
import { cx } from '@emotion/css';

import { ClassNameGenerator, convertCSToClassName } from '../utils';

import { PaginationProps, UsePaginationOptions } from './Pagination.types';
import { getCollapsibleRange } from './utils';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Pagination', element, modificator });

const getPage = (type: string, currentPage: number, pageCount: number) => {
  switch (type) {
    case 'first-page':
      return 1;
    case 'previous-page':
      return currentPage - 1;
    case 'next-page':
      return currentPage + 1;
    case 'last-page':
      return pageCount;
    default:
      return null;
  }
};

export const usePagination = (options: UsePaginationOptions) => {
  const {
    defaultPage,
    showFirstButton,
    showLastButton,
    hidePrevButton,
    hideNextButton,
    onPageChange,
    onValuePageChange,
  } = options;

  const [ownerPage, setOwnerPage] = useState(defaultPage ?? 1);

  const page = ownerPage ?? options.page;
  const pageItems = getCollapsibleRange({ ...options, page });

  const items = [
    ...(showFirstButton ? ['first-page'] : []),
    ...(hidePrevButton ? [] : ['previous-page']),
    ...pageItems,
    ...(hideNextButton ? [] : ['next-page']),
    ...(showLastButton ? ['last-page'] : []),
  ];

  const handleClick = (event: React.MouseEvent, value: number | null) => {
    if (value === null) {
      return;
    }

    if (!options.page) {
      setOwnerPage(value);
    }

    onPageChange?.(event, value);
    onValuePageChange?.(value);
  };

  return items.map((item) => {
    return typeof item === 'number'
      ? {
          'aria-current': item === options.page ? 'page' : undefined,
          type: 'page',
          page: item,
          selected: item === options.page,
          onClick: (event: React.MouseEvent) => {
            handleClick(event, item);
          },
        }
      : {
          type: item,
          page: getPage(item, page, options.pageCount ?? 1),
          selected: false,
          onClick: (event: React.MouseEvent) => {
            handleClick(event, getPage(item, page, options.pageCount ?? 1));
          },
        };
  });
};

export const Pagination = (props: PaginationProps) => {
  const { className, cs } = props;

  const items = usePagination(props);

  return (
    <nav className={cx(getCN(), convertCSToClassName(cs?.container), className)}>
      <ul className={getCN('ul')}>
        {items.map((item) => {
          return <li>{item.type}</li>;
        })}
      </ul>
    </nav>
  );
};
