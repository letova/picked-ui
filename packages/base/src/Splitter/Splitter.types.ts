import { CSSObject } from '@emotion/css';

export interface SplitterCS {
  container: CSSObject;
}

export interface SplitterSectionProps {
  className?: string;
  min?: number;
  max?: number;
  children?: React.ReactNode;
}

export interface SplitterProps {
  className?: string;
  children?: React.ReactNode;
  cs?: SplitterCS;
}
