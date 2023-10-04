import { css } from '@emotion/css';

import { getPxSize } from '../../utils';

import { TreeViewProps } from './TreeView.types';

export const getClassName = ({ scale: s = 1 }: TreeViewProps) => {
  return css`
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getPxSize(14, s)};
  `;
};
