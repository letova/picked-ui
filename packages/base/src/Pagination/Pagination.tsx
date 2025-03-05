import { cx } from '@emotion/css';

import { ClassNameGenerator, convertCSToClassName } from '../utils';

import { PaginationProps } from './Pagination.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Pagination', element, modificator });

export const Pagination = (props: PaginationProps) => {
  const { className, cs } = props;

  const items: string[] = [];

  return (
    <nav className={cx(getCN(), convertCSToClassName(cs?.container), className)}>
      <ul className={getCN('ul')}>
        {items.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </nav>
  );
};
