import { ChipProps as BaseChipProps } from '@picked-ui/base';

export interface ChipProps extends BaseChipProps {
  /**
   * The color of the component
   * @default primary
   */
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  /**
   * Determine the max-width of the component.
   * Content truncates with ellipsis when it overflows the element's box.
   */
  maxWidth?: number;
  /**
   * The scale of the component
   * @default 1
   */
  scale?: number;
  /**
   * The size of the component
   * @default s
   */
  size?: 'xs' | 's' | 'm';
  /**
   * The variant of the component
   * @default solid
   */
  variant?: 'soft' | 'solid' | 'outlined';
}
