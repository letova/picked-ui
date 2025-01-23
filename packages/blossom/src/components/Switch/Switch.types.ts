import { SwitchProps as BaseSwitchProps } from '@picked-ui/base';

export interface SwitchProps extends BaseSwitchProps {
  /**
   * The color of the component
   * @default primary
   */
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  /**
   * The focus outline wraps target
   * @default input
   */
  focusOutlineWraps?: 'input' | 'full';
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
   * The size of the thumb
   */
  thumbSize?: number;
  /**
   * The height of the track
   */
  trackHeight?: number;
  /**
   * The width of the track
   */
  trackWidth?: number;
  /**
   * The variant of the component
   * @default solid
   */
  variant?: 'soft' | 'solid' | 'outlined';
}
