import { RefObject } from 'react';
import { CSSObject } from '@emotion/css';

import { CustomStyle, Slot } from '../types';

export interface UseTreeViewFocusResult {
  setElement: (element: HTMLLIElement | null) => void;
  focus: (id: string) => void;
  setFocusable: (id: string) => void;
  getFocusedNodeId: () => string | undefined;
}

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
   * Autofocus on the first node/selected node
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Defines how the component behaves
   */
  mode?: 'single-select' | 'multi-select';
  /**
   * Method to filter (or not for "all") selectedIds
   * @default all
   */
  selectionMode?: 'all' | 'parent' | 'child';
  /**
   * Expanded node id/ids, level or "all" value
   */
  expandedIds?: string | string[] | number;
  /**
   * Single-select: selected node id
   * Multi-select: selected node id/ids or "all" value
   */
  selectedIds?: string | string[];
  /**
   * Disabled node id/ids
   */
  disabledIds?: string | string[];
  /**
   * List of nodes
   */
  data?: TreeViewNode[];
  search?: TreeViewSearchOptions;
  /**
   * Slots
   */
  slots?: {
    label?: Partial<Slot>;
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
   * Callback fired when tree view state is inited
   */
  onInitState?: (state: { expandedIds: string[]; selectedIds: string[]; disabledIds: string[] }) => void;
  /**
   * Callback fired when tree items are expanded/collapsed
   */
  onExpandedIdsChange?: (options: { expandedIds: string[] | undefined }) => void;
  /**
   * Callback fired when tree items are expanded/collapsed
   */
  onNodeExpansionChange?: (
    event: React.SyntheticEvent,
    options: { node: TreeViewNode; isExpanded: boolean; expandedIds: string[] | undefined },
  ) => void;
  /**
   * Callback fired when tree items are selected/unselected
   */
  onSelectedIdsChange?: (options: { selectedIds: string | string[] | undefined }) => void;
  /**
   * Callback fired when tree items are selected/unselected. Selected ids order is not guaranteed
   */
  onNodeSelectionChange?: (
    event: React.SyntheticEvent,
    options: { node: TreeViewNode; isSelected: boolean; selectedIds: string | string[] | undefined },
  ) => void;
  /**
   * Load data asynchronously
   */
  onLoadData?: (node: TreeViewNode) => Promise<unknown>;
  /**
   * Callback fired when tree view state is updated
   */
  onUpdateState?: (state: { expandedIds: string[]; selectedIds: string[]; disabledIds: string[] }) => void;
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
  prevInteractionId: string | undefined;
  nextInteractionId: string | undefined;
  left: number;
  right: number;
  searchMatch?: TreeViewNodeMatchResult;
  hasEnabledSelectedLeafs?: boolean;
  hasEnabledUnselectedLeafs?: boolean;
  hasDisabledSelectedLeafs?: boolean;
  hasDisabledUnselectedLeafs?: boolean;
}

export interface TreeContext<T>
  extends Pick<
    TreeViewProps,
    | 'selectionMode'
    | 'onExpandedIdsChange'
    | 'onNodeExpansionChange'
    | 'onSelectedIdsChange'
    | 'onNodeSelectionChange'
    | 'onLoadData'
  > {
  mode: NonNullable<TreeViewProps['mode']>;
  level: number;
  slots?: TreeViewProps['slots'];
  cs?: TreeViewCS;
  treeInformationRef: React.RefObject<T>;
  focusApi: UseTreeViewFocusResult;
}

export interface LoadingExpandButtonProps {
  className?: string;
  node: TreeViewNode;
  expanded: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onLoadData: NonNullable<TreeViewProps['onLoadData']>;
}
