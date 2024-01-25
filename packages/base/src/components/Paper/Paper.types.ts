import React from 'react';
import { CSSObject } from '@emotion/css';

export interface CustomStyles {
  container: CSSObject;
}

export interface PaperProps {
  className?: string;
  children?: React.ReactNode;
  elevation?: number;
  cs?: CustomStyles;
}
