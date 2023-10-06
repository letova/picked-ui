import { CSSObject } from '@emotion/css';

import { GetCSSObjectFn } from '../../utils';

export interface CustomStyles {
  container?: CSSObject;
  noDataView?: CSSObject;
  group?: CSSObject;
  treeItem?: CSSObject | GetCSSObjectFn;
  content?: CSSObject;
  expandButton?: CSSObject | GetCSSObjectFn;
}

export interface NodeType {
  id: string;
  label: string;
  children?: NodeType[];
  value?: any;
  isLeaf?: boolean;
}

export interface TreeViewProps {
  className?: string;
  /**
   * Defines how the dropdown is rendered / behaves
   */
  mode?: 'single-select' | 'multi-select';
  /**
   * Selected node id/ids or "all" value
   */
  selected?: string | string[];
  /**
   * Expanded node id/ids, level or "all" value
   */
  expanded?: string | string[] | number;
  /**
   * Disabled node id/ids
   */
  disabled?: string | string[];
  /**
   * List of nodes
   */
  data?: NodeType[];
  cs?: CustomStyles;
  /**
   * Show checkbox for each tree item
   */
  showCheckbox?: boolean;
  /**
   * Callback fired when tree items are expanded/collapsed
   */
  onNodeExpandChange?: (node: NodeType, expanded: boolean, event: React.SyntheticEvent) => void;
  /**
   * Callback fired when tree items are selected/unselected
   */
  onNodeSelectChange?: (node: NodeType, selected: boolean, event: React.SyntheticEvent) => void;
}

/**
 * PRIVATE TYPES
 */

export interface NodeState {
  selected: boolean;
  expanded: boolean;
  disabled: boolean;
  indeterminate: boolean;
}

export interface NodeMetadata {
  parentId: string | undefined;
  left: number;
  right: number;
}

export interface TreeContext {
  level: number;
  cs?: CustomStyles;
  getStateById: (id: string) => NodeState;
}
