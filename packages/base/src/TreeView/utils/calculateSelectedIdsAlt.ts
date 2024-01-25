import { forEachTree } from '../../utils';

import { NodeMetadata, TreeViewNode } from '../TreeView.types';

export const calculateSelectedIdsAlt = (
  data: TreeViewNode[],
  {
    triggerNodeId,
    selectedIds,
    disabledIds,
  }: // getMetadataById,
  {
    triggerNodeId: string;
    selectedIds: string[];
    disabledIds: string[];
    getMetadataById: (id: string) => NodeMetadata;
  },
) => {
  const initialSelectedIdsSet = new Set(selectedIds);
  const disabledIdsSet = new Set(disabledIds);

  const nextSelectedIds: string[] = [];

  const process = (currentData: TreeViewNode[], currentTriggerNodeId: string, selectedIdsSet: Set<string>) => {
    return currentData.forEach((node) => {
      /**
       * TRIGER NODE branch | always ENABLED
       */
      const initialIsSelected =
        node.id === triggerNodeId ? !initialSelectedIdsSet.has(node.id) : initialSelectedIdsSet.has(node.id);
      const isSelected = node.id === triggerNodeId ? !selectedIdsSet.has(node.id) : selectedIdsSet.has(node.id);
      const isDisabled = disabledIdsSet.has(node.id);

      if (!node.children) {
        if (isSelected && !isDisabled) {
          nextSelectedIds.push(node.id);
        }
        return;
      }

      if (isDisabled) {
        if (initialIsSelected) {
          nextSelectedIds.push(node.id);

          if (node.children) {
            forEachTree(node.children, (childNode) => {
              nextSelectedIds.push(childNode.id);
            });
          }
        }

        return;
      }

      if (node.id === currentTriggerNodeId) {
        node.children.forEach((childNode) => {
          process(
            node.children!,
            childNode.id,
            isSelected
              ? new Set(...selectedIdsSet, childNode.id)
              : new Set(Array.from(selectedIdsSet).filter((id) => id !== childNode.id)),
          );
        });
      } else {
        process(node.children, currentTriggerNodeId, selectedIdsSet);
      }

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
