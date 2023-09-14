import { NodeType } from '../TreeView.types';

export interface DescendantsCheckedState {
  hasEnabledCheckedEndNodes: boolean;
  hasEnabledUncheckedEndNodes: boolean;
  hasDisabledCheckedEndNodes: boolean;
  hasDisabledUncheckedEndNodes: boolean;
}

export const getDescendantsCheckedState = (
  tree: NodeType[] | undefined,
  contex: { disabledByParent: boolean } = { disabledByParent: false },
  state: DescendantsCheckedState = {
    hasEnabledCheckedEndNodes: false,
    hasEnabledUncheckedEndNodes: false,
    hasDisabledCheckedEndNodes: false,
    hasDisabledUncheckedEndNodes: false,
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
        if (node.checked && !result.hasEnabledCheckedEndNodes) {
          result.hasEnabledCheckedEndNodes = true;
        }

        if (!node.checked && !result.hasEnabledUncheckedEndNodes) {
          result.hasEnabledUncheckedEndNodes = true;
        }
      }

      if (isDisabled) {
        if (node.checked && !result.hasDisabledCheckedEndNodes) {
          result.hasDisabledCheckedEndNodes = true;
        }

        if (!node.checked && !result.hasDisabledUncheckedEndNodes) {
          result.hasDisabledUncheckedEndNodes = true;
        }
      }
    }

    if (hasChildren) {
      getDescendantsCheckedState(node.children, { disabledByParent: isDisabled }, result);
    }

    return result;
  }, state);
};
