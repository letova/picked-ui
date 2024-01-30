import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { Chip } from '../Chip';

import { ChipListProps } from './ChipList.types';

export const ChipList = forwardRef(
  ({ className, items, defaultItem }: ChipListProps, ref: ForwardedRef<HTMLDivElement>) => {
    const collapsedItemsCount = 1;

    return (
      <div ref={ref} className={cx('ChipList', className)} data-testid="chip-list">
        {items.map((chipProps) => {
          return (
            <Chip
              {...defaultItem}
              {...chipProps}
              className={cx('ChipList-item', defaultItem?.className, chipProps.className)}
            />
          );
        })}
        {collapsedItemsCount ? (
          <Chip className={cx('ChipList-item', 'ChipList-item--collapsed')}>{`+${collapsedItemsCount}`}</Chip>
        ) : null}
      </div>
    );
  },
);
