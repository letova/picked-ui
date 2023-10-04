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

interface NodeState {
  selected: boolean;
  expanded: boolean;
  indeterminate: boolean;
}

export interface TreeContext {
  level: number;
  getStateById: (id: string) => NodeState;
}
