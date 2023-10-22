import { css } from '@emotion/css';

import { deepMergeCS, getPxSize } from '../../utils';

import { TreeViewProps } from './TreeView.types';

export enum Colors {
  Black = '#000',
  SemitransparentBlack15 = 'rgba(0, 0, 0, 0.15)',
}

export const getClassName = ({ scale: s = 1 }: TreeViewProps) => {
  return css`
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: ${getPxSize(14, s)};
  `;
};

export const getCS = ({ scale: s = 1, cs }: TreeViewProps): TreeViewProps['cs'] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return deepMergeCS(
    {
      expandButton: () => {
        // fn for arrow variant
        return {
          width: getPxSize(16, s),
          height: getPxSize(16, s),
          padding: `0 ${getPxSize(3, s)}`,
          border: `${getPxSize(1, s)} solid ${Colors.Black}`,
          borderRadius: getPxSize(3, s),
          cursor: 'pointer',
          background: 'transparent',
        };
      },
      group: ({ level }: { level: number }) => {
        return {
          marginLeft: level === 1 ? 0 : getPxSize(8, s),
          paddingLeft: level === 1 ? 0 : getPxSize(8, s),
          borderLeft: level === 1 ? 'none' : `${getPxSize(1, s)} solid ${Colors.Black}`,
          listStyleType: 'none',
          boxSizing: 'border-box',
        };
      },
      content: {
        padding: `${getPxSize(1, s)} 0`,
      },
      label: ({ selected, disabled }: { selected: boolean; disabled: boolean }) => {
        return {
          display: 'inline-block',
          marginLeft: getPxSize(8, s),
          padding: getPxSize(4, s),
          borderRadius: getPxSize(3, s),
          color: disabled ? 'gray' : ' black',
          background: selected ? Colors.SemitransparentBlack15 : 'transparent',
          cursor: disabled ? 'default' : 'pointer',
        };
      },
    },
    cs,
  );
};
