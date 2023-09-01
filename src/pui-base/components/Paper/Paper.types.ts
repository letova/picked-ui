import React from 'react';

export interface CustomStyles {
  container: React.CSSProperties;
}

export interface PaperProps {
  className?: string;
  children?: React.ReactNode;
  elevation?: number;
  customStyles?: CustomStyles;
}
