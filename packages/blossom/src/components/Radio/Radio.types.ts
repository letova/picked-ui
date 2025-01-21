import { CSSObject } from '@emotion/css';
import { RadioProps as BaseRadioProps } from '@picked-ui/base';

export type RadioIconProps = Pick<RadioProps, 'className' | 'checked' | 'checkedIcon' | 'uncheckedIcon'> & {
  checkedStyle: CSSObject;
};

export interface RadioProps extends BaseRadioProps {
  /**
   * The icon when checked is true
   */
  checkedIcon?: React.ReactNode;
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
   * The icon when checked is false
   */
  uncheckedIcon?: React.ReactNode;
  /**
   * The variant of the component
   * @default solid
   */
  variant?: 'soft' | 'solid' | 'outlined';
}
