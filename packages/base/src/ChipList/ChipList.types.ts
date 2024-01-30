import { ChipProps } from '../Chip';

export interface ChipListItem extends ChipProps {
  id: string;
}

export interface ChipListProps {
  className?: string;
  items: ChipListItem[];
  defaultItem?: ChipProps;
  /**
   * The max number of items to show. The remaining items are collapsed into one.
   */
  maxCount?: number | 'auto';
}
