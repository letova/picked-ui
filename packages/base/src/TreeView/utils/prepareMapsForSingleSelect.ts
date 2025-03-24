import { isNil } from '../../utils';

import { NodeMetadata, NodeState, TreeViewNode, TreeViewProps } from '../TreeView.types';

import { getDisabledIdsMap, getExpandedIdsMap } from './maps';

interface ProcessContext {
  parentId?: string;
  parentIsDisabled: boolean;
  ancestorsAreExpanded: boolean;
  level: number;
  hidden: boolean;
}

const INITIAL_PROCESS_CONTEXT: ProcessContext = {
  parentId: undefined,
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
  stateMap: Record<string, NodeState>;
  metadataMap: Record<string, NodeMetadata>;
  selectedIds: string[];
  expandedIds: string[];
  disabledIds: string[];
}

export const prepareMapsForSingleSelect = (props: TreeViewProps): PrepareMapsResult => {
  const expandedIdsMap = getExpandedIdsMap(props.expandedIds);
  const disabledIdsMap = getDisabledIdsMap(props.disabledIds);

  let total = 0;

  let lastInteractionId: string | undefined = undefined;

  const stateMap: Record<string, NodeState> = {};
  const metadataMap: Record<string, NodeMetadata> = {};

  const expandedIds: string[] = [];
  const selectedIds: string[] = [];
  const disabledIds: string[] = [];

  if (!props.data) {
    return { total, stateMap, metadataMap, selectedIds, expandedIds, disabledIds };
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

      const visible = isNil(context.parentId) && context.ancestorsAreExpanded;

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

      if (props.selectedIds === 'all' || Array.isArray(props.selectedIds)) {
        throw new Error(`TreeView: received an invalid prop: 'selected'!`);
      }

      state.selected = node.id === props.selectedIds;
      state.indeterminate = false;

      state.expanded =
        props.expandedIds === 'all' ||
        Boolean(expandedIdsMap[node.id]) ||
        (typeof props.expandedIds === 'number' ? context.level <= props.expandedIds : false);

      state.disabled = Boolean(disabledIdsMap[node.id]) || context.parentIsDisabled;

      if (node.children) {
        process(node.children, {
          parentId: node.id,
          parentIsDisabled: state.disabled,
          ancestorsAreExpanded: context.ancestorsAreExpanded === false ? false : state.expanded,
          level: context.level + 1,
          hidden,
        });

        const descendantIds: string[] = [];

        node.children.forEach((childNode) => {
          const { descendantIds } = metadataMap[childNode.id];
          const { hidden: childHidden } = stateMap[childNode.id];

          const next = descendantIds ? [childNode.id, ...descendantIds] : [childNode.id];
          descendantIds?.push(...next);

          if (hidden && !childHidden) {
            hidden = false;
          }
        });

        metadata.descendantIds = descendantIds;

        right = traversalCounter + 1;
      }

      metadata.right = right;
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

      stateMap[node.id] = state;
      metadataMap[node.id] = metadata;

      traversalCounter += 1;
    });
  };

  process(props.data, isNil(props.search) ? INITIAL_PROCESS_CONTEXT : { ...INITIAL_PROCESS_CONTEXT, hidden: true });

  return { total, stateMap, metadataMap, expandedIds, selectedIds, disabledIds };
};
