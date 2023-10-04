import { CSSObject } from '@emotion/css';

import { TreeViewProps as BaseTreeViewProps } from '../../../../pui-base/src/components/TreeView';

export interface TreeViewProps extends BaseTreeViewProps {
  variant?: 'plain' | 'line';
  scale?: number;
  customCss?: CSSObject;
}
