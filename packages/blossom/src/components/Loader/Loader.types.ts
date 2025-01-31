import { CSSObject } from '@emotion/css';

export interface LoaderProps {
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
  variant?: 'circle' | 'dots';
}
