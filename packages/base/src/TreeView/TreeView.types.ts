import { RefObject } from 'react';
import { CSSObject } from '@emotion/css';

import { CustomStyle, Slot } from '../types';

export interface TreeViewCS {
  container?: CSSObject;
  noDataView?: CSSObject;
  group?: CSSObject;
  treeItem?: CustomStyle;
  content?: CSSObject;
  expandButton?: CustomStyle;
  label?: CustomStyle;
}

export interface TreeViewNodeMatchResult {
  result: boolean;
  html?: string;
}

export interface TreeViewSearchOptions {
  // value?: string;
  match: (node: TreeViewNode) => TreeViewNodeMatchResult | undefined;
}

export interface TreeViewNode {
  id: string;
  label: string;
  children?: TreeViewNode[];
  value?: any;
  isLeaf?: boolean;
}

export interface TreeViewApi {
  getStateById: (id: string) => NodeState | undefined;
  getMetadataById: (id: string) => NodeMetadata | undefined;
}

export interface TreeViewProps {
  className?: string;
  /**
   * TreeView API
   */
  apiRef?: RefObject<TreeViewApi>;
  /**
   * Defines how the component behaves
   */
  mode?: 'single-select' | 'multi-select';
  /**
   * Expanded node id/ids, level or "all" value
   */
  expanded?: string | string[] | number;
  /**
   * Single-select: selected node id
   * Multi-select: selected node id/ids or "all" value
   */
  selected?: string | string[];
  /**
   * Disabled node id/ids
   */
  disabled?: string | string[];
  /**
   * List of nodes
   */
  data?: TreeViewNode[];
  search?: TreeViewSearchOptions;
  /**
   * Slots
   */
  slots?: {
    labelStartDecorator?: Slot;
    labelEndDecorator?: Slot;
  };
  /**
   * Custom styles object
   */
  cs?: TreeViewCS;
  /**
   * Show checkbox for each tree item
   */
  showCheckbox?: boolean;
  /**
   * Callback fired when tree items are expanded/collapsed
   */
  onNodeExpandChange?: (
    options: { node: TreeViewNode; isExpanded: boolean; expandedIds: string[] | undefined },
    event: React.SyntheticEvent,
  ) => void;
  /**
   * Callback fired when tree items are selected/unselected. Selected ids order is not guaranteed
   */
  onNodeSelectChange?: (
    options: { node: TreeViewNode; isSelected: boolean; selectedIds: string | string[] | undefined },
    event: React.SyntheticEvent,
  ) => void;
  /**
   * Load data asynchronously
   */
  onLoadData?: (node: TreeViewNode) => Promise<unknown>;
}

/**
 * PRIVATE TYPES
 */

export interface NodeState {
  expanded: boolean;
  selected: boolean;
  indeterminate: boolean;
  disabled: boolean;
  hidden: boolean;
}

export interface NodeMetadata {
  parentId: string | undefined;
  descendantIds: string[] | undefined;
  left: number;
  right: number;
  searchMatch?: TreeViewNodeMatchResult;
  hasEnabledSelectedLeafs?: boolean;
  hasEnabledUnselectedLeafs?: boolean;
  hasDisabledSelectedLeafs?: boolean;
  hasDisabledUnselectedLeafs?: boolean;
}

export interface TreeContext<T>
  extends Pick<TreeViewProps, 'onNodeExpandChange' | 'onNodeSelectChange' | 'onLoadData'> {
  mode: NonNullable<TreeViewProps['mode']>;
  level: number;
  slots?: TreeViewProps['slots'];
  cs?: TreeViewCS;
  treeInformationRef: React.RefObject<T>;
}

export interface LoadingExpandButtonProps {
  className?: string;
  node: TreeViewNode;
  expanded: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onLoadData: NonNullable<TreeViewProps['onLoadData']>;
}
