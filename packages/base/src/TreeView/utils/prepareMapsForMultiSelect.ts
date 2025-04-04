import { isNil } from '../../utils';

import { NodeMetadata, NodeState, TreeViewNode, TreeViewProps } from '../TreeView.types';

import { getDisabledIdsMap, getExpandedIdsMap, getSelectedIdsMap } from './maps';

interface ProcessContext {
  parentId?: string;
  parentIsSelected: boolean;
  parentIsDisabled: boolean;
  ancestorsAreExpanded: boolean;
  level: number;
  hidden: boolean;
}

const INITIAL_PROCESS_CONTEXT: ProcessContext = {
  parentId: undefined,
  parentIsSelected: false,
  parentIsDisabled: false,
  ancestorsAreExpanded: true,
  level: 1,
  hidden: false,
};

const INITIAL_NODE_STATE: NodeState = {
  selected: false,
  expanded: false,
  disabled: false,
  indeterminate: false,
  hidden: false,
};

const INITIAL_NODE_METADATA: NodeMetadata = {
  parentId: undefined,
  descendantIds: undefined,
  left: 0,
  right: 0,
  prevInteractionId: undefined,
  nextInteractionId: undefined,
};

interface PrepareMapsResult {
  total: number;
  selectedIds: string[];
  expandedIds: string[];
  disabledIds: string[];
  nodeMap: Record<string, TreeViewNode>;
  stateMap: Record<string, NodeState>;
  metadataMap: Record<string, NodeMetadata>;
}

export const prepareMapsForMultiSelect = (props: TreeViewProps): PrepareMapsResult => {
  const selectedIdsMap = getSelectedIdsMap(props.selectedIds);
  const expandedIdsMap = getExpandedIdsMap(props.expandedIds);
  const disabledIdsMap = getDisabledIdsMap(props.disabledIds);

  let total = 0;

  let lastInteractionId: string | undefined = undefined;

  const nodeMap: Record<string, TreeViewNode> = {};
  const stateMap: Record<string, NodeState> = {};
  const metadataMap: Record<string, NodeMetadata> = {};

  const expandedIds: string[] = [];
  const selectedIds: string[] = [];
  const disabledIds: string[] = [];

  if (!props.data) {
    return { total, nodeMap, stateMap, metadataMap, selectedIds, expandedIds, disabledIds };
  }

  // Depth-first search (DFS)
  let traversalCounter = 0;

  const process = (data: TreeViewNode[], context: ProcessContext) => {
    data.forEach((node, idx, levelNodes) => {
      const state: NodeState = { ...INITIAL_NODE_STATE };
      const metadata: NodeMetadata = { ...INITIAL_NODE_METADATA };

      total += 1;
      traversalCounter += 1;

      /**
       * Node metadata
       */
      let right = traversalCounter + 1;

      metadata.left = traversalCounter;
      metadata.parentId = context.parentId;
      metadata.searchMatch = props.search?.match(node);

      /**
       * Node state
       */
      let hidden = isNil(props.search) ? false : !metadata.searchMatch!.result;

      let selected =
        props.selectedIds === 'all' || Boolean(selectedIdsMap[node.id]) || context.parentIsSelected || false;

      let indeterminate = false;

      state.expanded =
        props.expandedIds === 'all' ||
        Boolean(expandedIdsMap[node.id]) ||
        (typeof props.expandedIds === 'number' ? context.level <= props.expandedIds : false);

      state.disabled = Boolean(disabledIdsMap[node.id]) || context.parentIsDisabled;

      if (node.children) {
        process(node.children, {
          parentId: node.id,
          parentIsSelected: selected,
          parentIsDisabled: state.disabled,
          ancestorsAreExpanded: context.ancestorsAreExpanded === false ? false : state.expanded,
          level: context.level + 1,
          hidden,
        });

        if (!selected && node.children.every(({ id }) => stateMap[id].selected)) {
          selected = true;
        }

        if (
          !indeterminate &&
          !selected &&
          node.children.some(({ id }) => stateMap[id].selected || stateMap[id].indeterminate)
        ) {
          indeterminate = true;
        }

        const descendantIds: string[] = [];

        let hasEnabledSelectedLeafs = false;
        let hasEnabledUnselectedLeafs = false;
        let hasDisabledSelectedLeafs = false;
        let hasDisabledUnselectedLeafs = false;

        node.children.forEach((childNode) => {
          const { selected, disabled, hidden: childHidden } = stateMap[childNode.id];
          const childMetadata = metadataMap[childNode.id];

          descendantIds?.push(
            ...(childMetadata.descendantIds ? [childNode.id, ...childMetadata.descendantIds] : [childNode.id]),
          );

          hasEnabledSelectedLeafs =
            (!childNode.children && selected && !disabled) ||
            childMetadata.hasEnabledSelectedLeafs ||
            hasEnabledSelectedLeafs;

          hasEnabledUnselectedLeafs =
            (!childNode.children && !selected && !disabled) ||
            childMetadata.hasEnabledUnselectedLeafs ||
            hasEnabledUnselectedLeafs;

          hasDisabledSelectedLeafs =
            (!childNode.children && selected && disabled) ||
            childMetadata.hasDisabledSelectedLeafs ||
            hasDisabledSelectedLeafs;

          hasDisabledUnselectedLeafs =
            (!childNode.children && !selected && disabled) ||
            childMetadata.hasDisabledUnselectedLeafs ||
            hasDisabledUnselectedLeafs;

          if (hidden && !childHidden) {
            hidden = false;
          }
        });

        metadata.hasEnabledSelectedLeafs = hasEnabledSelectedLeafs;
        metadata.hasEnabledUnselectedLeafs = hasEnabledUnselectedLeafs;
        metadata.hasDisabledSelectedLeafs = hasDisabledSelectedLeafs;
        metadata.hasDisabledUnselectedLeafs = hasDisabledUnselectedLeafs;
        metadata.descendantIds = descendantIds;

        right = traversalCounter + 1;
      }

      const visible = (isNil(context.parentId) || context.ancestorsAreExpanded) && !hidden;

      if (visible) {
        if (state.expanded && node.children?.length) {
          metadata.nextInteractionId = node.children[0].id;
        } else {
          metadata.nextInteractionId = levelNodes[idx + 1]?.id;
        }

        metadata.prevInteractionId = lastInteractionId;

        /**
         * Set the next node id for an end nodes of descendants
         */
        if (
          lastInteractionId &&
          !isNil(metadataMap[lastInteractionId]?.prevInteractionId) &&
          isNil(metadataMap[lastInteractionId]?.nextInteractionId)
        ) {
          metadataMap[lastInteractionId].nextInteractionId = node.id;
        }

        lastInteractionId = node.id;
      }

      metadata.right = right;
      state.selected = selected;
      state.indeterminate = indeterminate;
      state.hidden = hidden;

      /**
       * Sets maps
       */
      if (state.expanded) {
        expandedIds.push(node.id);
      }

      if (state.selected) {
        selectedIds.push(node.id);
      }

      if (state.disabled) {
        disabledIds.push(node.id);
      }

      nodeMap[node.id] = node;
      stateMap[node.id] = state;
      metadataMap[node.id] = metadata;

      traversalCounter += 1;
    });
  };

  process(props.data, isNil(props.search) ? INITIAL_PROCESS_CONTEXT : { ...INITIAL_PROCESS_CONTEXT, hidden: true });

  return { total, nodeMap, stateMap, metadataMap, expandedIds, selectedIds, disabledIds };
};
