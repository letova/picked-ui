export interface NodeType {
  id: string;
  label: string;
  children?: NodeType[];
  expanded?: boolean;
  checked?: boolean;
  disabled?: boolean;
  metadata?: {
    disabledByParent: boolean;
  };
}
