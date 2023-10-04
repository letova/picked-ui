import { NodeType } from '../TreeView.types';

import { getDescendantsCheckedState } from './getDescendantsCheckedState';
import { mapTree } from './mapTree';

export const getTreeWithUpdatedCheckedState = (updatedNode: NodeType, tree: NodeType[]) => {
  return tree.map((currentNode): NodeType => {
    const { children } = currentNode;

    /**
     * TRIGER NODE branch | always enabled
     */
    if (currentNode.id === updatedNode.id) {
      const {
        hasEnabledCheckedLeafNodes,
        hasEnabledUncheckedLeafNodes,
        hasDisabledCheckedLeafNodes,
        hasDisabledUncheckedLeafNodes,
      } = getDescendantsCheckedState(children, {
        disabledByParent: Boolean(currentNode.disabled) || Boolean(currentNode.metadata?.disabledByParent),
      });

      if (!children) {
        return { ...currentNode, checked: updatedNode.checked };
      }

      /**
       * TRIGER NODE with disabled descendants
       */
      if (hasDisabledCheckedLeafNodes || hasDisabledUncheckedLeafNodes) {
        return {
          ...currentNode,
          checked: updatedNode.checked
            ? !hasDisabledUncheckedLeafNodes
            : !(hasEnabledCheckedLeafNodes || hasEnabledUncheckedLeafNodes || hasDisabledUncheckedLeafNodes),
          children: children.map((node) => {
            if (node.disabled) {
              return node;
            }

            /**
             * Making the current node is trigger node to update the children
             */
            return getTreeWithUpdatedCheckedState({ ...node, checked: updatedNode.checked }, [node])[0];
          }),
        };
        /**
         * TRIGER NODE without disabled descendants
         */
      } else {
        return {
          ...currentNode,
          checked: updatedNode.checked,
          children: mapTree(children, (node) => {
            return { ...node, checked: updatedNode.checked };
          }),
        };
      }
    }

    /**
     * ANOTHER NODE branch
     */
    if (!children || currentNode.disabled) {
      return currentNode.checked ? currentNode : { ...currentNode, checked: false };
    }

    /**
     * To find out the actual state you need to update the subtree
     */
    const nextChildren = getTreeWithUpdatedCheckedState(updatedNode, children);

    const { hasEnabledUncheckedLeafNodes, hasDisabledUncheckedLeafNodes } = getDescendantsCheckedState(nextChildren, {
      disabledByParent: Boolean(currentNode.disabled) || Boolean(currentNode.metadata?.disabledByParent),
    });

    const nextNode: NodeType = {
      ...currentNode,
      checked: !hasEnabledUncheckedLeafNodes && !hasDisabledUncheckedLeafNodes,
      children: nextChildren,
    };

    return nextNode;
  });
};
