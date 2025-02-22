import { ButtonProps as BaseButtonProps } from '@picked-ui/base';

export interface ButtonProps extends BaseButtonProps {
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
   * The edge style the component
   * @default round
   */
  shape?: 'brick' | 'round' | 'fully-round';
  /**
   * The size of the component
   * @default s
   */
  size?: 'xs' | 's' | 'm';
  /**
   * The variant of the component
   * @default solid
   */
  variant?: 'soft' | 'solid' | 'outlined' | 'plain';
  /**
   * If "max", the component will take up the full width of its container
   * @default auto
   */
  width?: 'auto' | 'max';
}
