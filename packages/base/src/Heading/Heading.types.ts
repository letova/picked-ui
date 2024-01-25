import { CSSObject } from '@emotion/css';

export interface HeadingCS {
  container?: CSSObject;
}

export interface HeadingProps {
  className?: string;
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'div' | 'span';
  cs?: HeadingCS;
}
