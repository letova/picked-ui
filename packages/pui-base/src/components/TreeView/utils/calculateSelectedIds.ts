import { forEachTree } from '../../../utils';

import { NodeMetadata, NodeType } from '../TreeView.types';

export const calculateSelectedIds = (
  data: NodeType[],
  {
    triggerNodeId,
    selectedIds,
    disabledIds,
    getMetadataById,
  }: {
    triggerNodeId: string;
    selectedIds: string[];
    disabledIds: string[];
    getMetadataById: (id: string) => NodeMetadata;
  },
) => {
  const initialSelectedIdsSet = new Set(selectedIds);
  const disabledIdsSet = new Set(disabledIds);

  const nextSelectedIds: string[] = [];

  const process = (currentData: NodeType[], currentTriggerNodeId: string, selectedIdsSet: Set<string>) => {
    return currentData.forEach((node) => {
      /**
       * TRIGER NODE branch | always ENABLED
       */
      const isSelected = selectedIdsSet.has(node.id);

      if (node.id === currentTriggerNodeId) {
        let desireIsSelected = node.id === triggerNodeId ? !isSelected : isSelected;

        /**
         * TRIGER NODE that has NO CHILDREN
         */
        if (!node.children) {
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
          desireIsSelected = desireIsSelected && !!hasEnabledUnselectedLeafs;

          const nextIsSelected = desireIsSelected
            ? !hasDisabledUnselectedLeafs
            : !(hasEnabledSelectedLeafs || hasEnabledUnselectedLeafs || hasDisabledUnselectedLeafs);

          if (nextIsSelected) {
            nextSelectedIds.push(node.id);
          }

          node.children.forEach((childNode) => {
            if (disabledIdsSet.has(childNode.id)) {
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
      const initialIsSelected = initialSelectedIdsSet.has(node.id);

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
