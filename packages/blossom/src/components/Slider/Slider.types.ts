import { SliderProps as BaseSliderProps } from '@picked-ui/base';

export interface SliderProps extends BaseSliderProps {
  /**
   * The color of the component
   * @default primary
   */
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
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
}