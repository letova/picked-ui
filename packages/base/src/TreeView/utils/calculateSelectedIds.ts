import { forEachTree } from '../../utils';

import { NodeMetadata, TreeViewNode } from '../TreeView.types';

interface CalculateSelectedIdsOptions {
  triggerNodeId: string;
  selectedIds: string[];
  disabledIds: string[];
  getMetadataById: (id: string) => NodeMetadata;
}

export const calculateSelectedIds = (
  data: TreeViewNode[],
  { triggerNodeId, selectedIds, disabledIds, getMetadataById }: CalculateSelectedIdsOptions,
) => {
  const initialSelectedIdsSet = new Set(selectedIds);
  const disabledIdsSet = new Set(disabledIds);

  const nextSelectedIds: string[] = [];

  const processDisabledNode = (node: TreeViewNode) => {
    if (initialSelectedIdsSet.has(node.id)) {
      nextSelectedIds.push(node.id);
    }

    if (node.children?.length) {
      forEachTree(node.children, (childNode) => {
        if (initialSelectedIdsSet.has(childNode.id)) {
          nextSelectedIds.push(childNode.id);
        }
      });
    }
  };

  const process = (currentData: TreeViewNode[], currentTriggerNodeId: string, selectedIdsSet: Set<string>) => {
    return currentData.forEach((node) => {
      /**
       * TRIGER NODE branch | always ENABLED
       */
      const isSelected = selectedIdsSet.has(node.id);

      if (node.id === currentTriggerNodeId) {
        /**
         * Toggle state when node is initial trigger node
         */
        let desireIsSelected = node.id === triggerNodeId ? !isSelected : isSelected;

        /**
         * TRIGER NODE that has NO CHILDREN
         */
        if (!node.children?.length) {
          if (desireIsSelected) {
            nextSelectedIds.push(node.id);
          }
          return;
        }

        /**
         * TRIGER NODE with CHILDREN
         */
        const {
          hasEnabledSelectedLeafs,
          hasEnabledUnselectedLeafs,
          hasDisabledSelectedLeafs,
          hasDisabledUnselectedLeafs,
        } = getMetadataById(node.id);

        /**
         * TRIGER NODE with DISABLED descendants
         */
        if (hasDisabledSelectedLeafs || hasDisabledUnselectedLeafs) {
          /**
           * Recalculate the desired state for the initial trigger node and its subtree, depending on the presence of unselected current leaves
           */
          if (node.id === triggerNodeId) {
            desireIsSelected = desireIsSelected && !!hasEnabledUnselectedLeafs;
          }

          /**
           * Calculate the actual state of current node, depending on the possibility of being selected
           */
          const nextIsSelected = desireIsSelected
            ? !hasDisabledUnselectedLeafs
            : !(hasEnabledSelectedLeafs || hasEnabledUnselectedLeafs || hasDisabledUnselectedLeafs);

          if (nextIsSelected) {
            nextSelectedIds.push(node.id);
          }

          node.children.forEach((childNode) => {
            if (disabledIdsSet.has(childNode.id)) {
              processDisabledNode(childNode);
              return;
            }

            process(
              [childNode],
              childNode.id,
              desireIsSelected
                ? new Set([...selectedIdsSet, childNode.id])
                : new Set([...selectedIdsSet].filter((value) => disabledIdsSet.has(value))),
            );
          });

          return;
        } else {
          if (desireIsSelected) {
            nextSelectedIds.push(node.id);

            if (node.children) {
              forEachTree(node.children, (childNode) => {
                nextSelectedIds.push(childNode.id);
              });
            }
          }

          return;
        }
      }

      /**
       * ANOTHER NODE branch
       */

      /**
       * Changed state come from trigger node branch
       */
      const isDisabled = disabledIdsSet.has(node.id);

      if (!node.children?.length) {
        if (isSelected && !isDisabled) {
          nextSelectedIds.push(node.id);
        }
        return;
      }

      if (isDisabled) {
        processDisabledNode(node);
        return;
      }

      /**
       * ANOTHER NODE has CHILDREN and ENABLED
       */
      process(node.children, currentTriggerNodeId, selectedIdsSet);

      let nextIsSelected = true;

      node.children.forEach((childNode) => {
        if (!nextSelectedIds.some((sId) => sId === childNode.id)) {
          nextIsSelected = false;
        }
      });

      if (nextIsSelected) {
        nextSelectedIds.push(node.id);
      }
    });
  };

  process(data, triggerNodeId, new Set(selectedIds));

  return nextSelectedIds.length ? nextSelectedIds : undefined;
};
