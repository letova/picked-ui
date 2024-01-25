import { isNil } from '../../utils';

import { NodeMetadata, NodeState, TreeViewNode, TreeViewProps } from '../TreeView.types';

import { getDisabledIdsMap, getExpandedIdsMap } from './maps';

interface ProcessContext {
  parentId?: string;
  parentIsDisabled: boolean;
  level: number;
  hidden: boolean;
}

const INITIAL_PROCESS_CONTEXT: ProcessContext = {
  parentId: undefined,
  parentIsDisabled: false,
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
};

interface PrepareMapsResult {
  stateMap: Record<string, NodeState>;
  metadataMap: Record<string, NodeMetadata>;
  selectedIds: string[];
  expandedIds: string[];
  disabledIds: string[];
}

export const prepareMapsForSingleSelect = (props: TreeViewProps): PrepareMapsResult => {
  const expandedIdsMap = getExpandedIdsMap(props.expanded);
  const disabledIdsMap = getDisabledIdsMap(props.disabled);

  const stateMap: Record<string, NodeState> = {};
  const metadataMap: Record<string, NodeMetadata> = {};
  const expandedIds: string[] = [];
  const selectedIds: string[] = [];
  const disabledIds: string[] = [];

  if (!props.data) {
    return { stateMap, metadataMap, selectedIds, expandedIds, disabledIds };
  }

  let nestedSetModelCounter = 0;

  const process = (data: TreeViewNode[], context: ProcessContext) => {
    data.forEach((node) => {
      const state: NodeState = { ...INITIAL_NODE_STATE };
      const metadata: NodeMetadata = { ...INITIAL_NODE_METADATA };

      nestedSetModelCounter += 1;

      /**
       * Node metadata
       */
      let right = nestedSetModelCounter + 1;

      metadata.left = nestedSetModelCounter;
      metadata.parentId = context.parentId;
      metadata.searchMatch = props.search?.match(node);

      /**
       * Node state
       */
      let hidden = isNil(props.search) ? false : !(metadata.searchMatch!.result || !context.hidden);

      if (props.selected === 'all' || Array.isArray(props.selected)) {
        throw new Error(`TreeView: received an invalid prop: 'selected'!`);
      }

      state.selected = node.id === props.selected;
      state.indeterminate = false;

      state.expanded =
        props.expanded === 'all' ||
        Boolean(expandedIdsMap[node.id]) ||
        (typeof props.expanded === 'number' ? context.level <= props.expanded : false);

      state.disabled = Boolean(disabledIdsMap[node.id]) || context.parentIsDisabled;

      if (node.children) {
        process(node.children, {
          parentId: node.id,
          parentIsDisabled: state.disabled,
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

        right = nestedSetModelCounter + 1;
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

      nestedSetModelCounter += 1;
    });
  };

  process(props.data, isNil(props.search) ? INITIAL_PROCESS_CONTEXT : { ...INITIAL_PROCESS_CONTEXT, hidden: true });

  return { stateMap, metadataMap, expandedIds, selectedIds, disabledIds };
};
