import { RefObject } from 'react';
import { CSSObject } from '@emotion/css';

import { GetCSSObjectFn } from '../../utils';

export interface CustomStyles {
  container?: CSSObject;
  noDataView?: CSSObject;
  group?: CSSObject;
  treeItem?: CSSObject | GetCSSObjectFn;
  content?: CSSObject;
  expandButton?: CSSObject | GetCSSObjectFn;
  label?: CSSObject | GetCSSObjectFn;
}

export interface MatchResult {
  result: boolean;
  html?: string;
}

export interface SearchOptions {
  // value?: string;
  match: (node: NodeType) => MatchResult | undefined;
}

export interface NodeType {
  id: string;
  label: string;
  children?: NodeType[];
  value?: any;
  isLeaf?: boolean;
}

export interface Api {
  getStateById: (id: string) => NodeState | undefined;
  getMetadataById: (id: string) => NodeMetadata | undefined;
}

export interface TreeViewProps {
  className?: string;
  /**
   * TreeView API
   */
  apiRef?: RefObject<Api>;
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
  data?: NodeType[];
  search?: SearchOptions;
  /**
   * Slots
   */
  slots?: {
    labelStartDecorator?: { component: React.ElementType<any>; props?: Record<string, unknown> };
    labelEndDecorator?: { component: React.ElementType<any>; props?: Record<string, unknown> };
  };
  /**
   * Custom styles object
   */
  cs?: CustomStyles;
  /**
   * Show checkbox for each tree item
   */
  showCheckbox?: boolean;
  /**
   * Callback fired when tree items are expanded/collapsed
   */
  onNodeExpandChange?: (
    options: { node: NodeType; isExpanded: boolean; expandedIds: string[] | undefined },
    event: React.SyntheticEvent,
  ) => void;
  /**
   * Callback fired when tree items are selected/unselected. Selected ids order is not guaranteed
   */
  onNodeSelectChange?: (
    options: { node: NodeType; isSelected: boolean; selectedIds: string | string[] | undefined },
    event: React.SyntheticEvent,
  ) => void;
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
  searchMatch?: MatchResult;
  hasEnabledSelectedLeafs?: boolean;
  hasEnabledUnselectedLeafs?: boolean;
  hasDisabledSelectedLeafs?: boolean;
  hasDisabledUnselectedLeafs?: boolean;
}

export interface TreeContext<T> extends Pick<TreeViewProps, 'onNodeExpandChange' | 'onNodeSelectChange'> {
  mode: NonNullable<TreeViewProps['mode']>;
  level: number;
  slots?: TreeViewProps['slots'];
  cs?: CustomStyles;
  treeInformationRef: React.RefObject<T>;
}
