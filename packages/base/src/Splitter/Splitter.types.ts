import { CSSObject } from '@emotion/css';

export interface SplitterCS {
  container?: CSSObject;
  section?: CSSObject;
  separator?: CSSObject;
}

export interface SplitterSectionProps {
  className?: string;
  min?: number;
  max?: number;
  children?: React.ReactNode;
  defaultSize?: number | string;
}

export interface SplitterProps {
  className?: string;
  children?: React.ReactNode;
  cs?: SplitterCS;
  /**
   * The component direction
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
}
