import { NodeType } from '../TreeView.types';

export interface DescendantsCheckedState {
  hasEnabledCheckedLeafNodes: boolean;
  hasEnabledUncheckedLeafNodes: boolean;
  hasDisabledCheckedLeafNodes: boolean;
  hasDisabledUncheckedLeafNodes: boolean;
}

export const getDescendantsCheckedState = (
  tree: NodeType[] | undefined,
  contex: { disabledByParent: boolean } = { disabledByParent: false },
  state: DescendantsCheckedState = {
    hasEnabledCheckedLeafNodes: false,
    hasEnabledUncheckedLeafNodes: false,
    hasDisabledCheckedLeafNodes: false,
    hasDisabledUncheckedLeafNodes: false,
  },
): DescendantsCheckedState => {
  if (!tree) {
    return state;
  }

  return tree.reduce<DescendantsCheckedState>((result, node) => {
    const hasChildren = Boolean(node.children?.length);
    const isDisabled = node.disabled || contex.disabledByParent;

    if (!hasChildren) {
      if (!isDisabled) {
        if (node.checked && !result.hasEnabledCheckedLeafNodes) {
          result.hasEnabledCheckedLeafNodes = true;
        }

        if (!node.checked && !result.hasEnabledUncheckedLeafNodes) {
          result.hasEnabledUncheckedLeafNodes = true;
        }
      }

      if (isDisabled) {
        if (node.checked && !result.hasDisabledCheckedLeafNodes) {
          result.hasDisabledCheckedLeafNodes = true;
        }

        if (!node.checked && !result.hasDisabledUncheckedLeafNodes) {
          result.hasDisabledUncheckedLeafNodes = true;
        }
      }
    }

    if (hasChildren) {
      getDescendantsCheckedState(node.children, { disabledByParent: isDisabled }, result);
    }

    return result;
  }, state);
};
