import { SwitchProps as BaseSwitchProps } from '@picked-ui/base';

export interface SwitchProps extends BaseSwitchProps {
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
  /**
   * The variant of the component
   * @default solid
   */
  variant?: 'soft' | 'solid' | 'outlined';
}
