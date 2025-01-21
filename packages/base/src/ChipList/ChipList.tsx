import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { Chip } from '../Chip';

import { ClassNameGenerator } from '../utils';

import { ChipListProps } from './ChipList.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'ChipList', element, modificator });

export const ChipList = forwardRef(
  ({ className, items, defaultItem }: ChipListProps, ref: ForwardedRef<HTMLDivElement>) => {
    const collapsedItemsCount = 1;

    return (
      <div ref={ref} className={cx(getCN(), className)} data-testid="chip-list">
        {items.map((chipProps) => {
          return (
            <Chip
              {...defaultItem}
              {...chipProps}
              className={cx(getCN('item'), defaultItem?.className, chipProps.className)}
            />
          );
        })}
        {collapsedItemsCount ? (
          <Chip className={cx(getCN('item'), getCN('item', 'collapsed'))}>{`+${collapsedItemsCount}`}</Chip>
        ) : null}
      </div>
    );
  },
);
