import { CSSObject } from '@emotion/css';

export interface SpinProps {
  className?: string;
  cs?: {
    container?: CSSObject;
    progress?: CSSObject;
  };
  /**
   * The scale of the component
   * @default 1
   */
  scale?: number;
  /**
   * The size of the component
   * @default s
   */
  size?: 'xs' | 's' | 'm' | number;
  type?: 'circle' | 'dots';
}
