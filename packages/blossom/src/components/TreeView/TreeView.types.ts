import { TreeViewProps as BaseTreeViewProps } from '@picked-ui/base';

export interface TreeViewProps extends BaseTreeViewProps {
  variant?: 'plain' | 'line';
  scale?: number;
}
