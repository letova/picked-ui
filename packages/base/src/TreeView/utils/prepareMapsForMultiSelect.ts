import { isNil } from '../../utils';

import { NodeMetadata, NodeState, TreeViewNode, TreeViewProps } from '../TreeView.types';

import { getDisabledIdsMap, getExpandedIdsMap, getSelectedIdsMap } from './maps';

interface ProcessContext {
  parentId?: string;
  parentIsSelected: boolean;
  parentIsDisabled: boolean;
  level: number;
  hidden: boolean;
}

const INITIAL_PROCESS_CONTEXT: ProcessContext = {
  parentId: undefined,
  parentIsSelected: false,
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

export const prepareMapsForMultiSelect = (props: TreeViewProps): PrepareMapsResult => {
  const selectedIdsMap = getSelectedIdsMap(props.selected);
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
      let selected = props.selected === 'all' || Boolean(selectedIdsMap[node.id]) || context.parentIsSelected || false;
      let indeterminate = false;

      let hidden = isNil(props.search) ? false : !(metadata.searchMatch!.result || !context.hidden);

      state.expanded =
        props.expanded === 'all' ||
        Boolean(expandedIdsMap[node.id]) ||
        (typeof props.expanded === 'number' ? context.level <= props.expanded : false);

      state.disabled = Boolean(disabledIdsMap[node.id]) || context.parentIsDisabled;

      if (node.children) {
        process(node.children, {
          parentId: node.id,
          parentIsSelected: selected,
          parentIsDisabled: state.disabled,
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
          const { descendantIds, ...restChildMetadata } = metadataMap[childNode.id];
          const next = descendantIds ? [childNode.id, ...descendantIds] : [childNode.id];
          descendantIds?.push(...next);

          hasEnabledSelectedLeafs =
            (!childNode.children && selected && !disabled) ||
            restChildMetadata.hasEnabledSelectedLeafs ||
            hasEnabledSelectedLeafs;

          hasEnabledUnselectedLeafs =
            (!childNode.children && !selected && !disabled) ||
            restChildMetadata.hasEnabledUnselectedLeafs ||
            hasEnabledUnselectedLeafs;

          hasDisabledSelectedLeafs =
            (!childNode.children && selected && disabled) ||
            restChildMetadata.hasDisabledSelectedLeafs ||
            hasDisabledSelectedLeafs;

          hasDisabledUnselectedLeafs =
            (!childNode.children && !selected && disabled) ||
            restChildMetadata.hasDisabledUnselectedLeafs ||
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

        right = nestedSetModelCounter + 1;
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

      stateMap[node.id] = state;
      metadataMap[node.id] = metadata;

      nestedSetModelCounter += 1;
    });
  };

  process(props.data, isNil(props.search) ? INITIAL_PROCESS_CONTEXT : { ...INITIAL_PROCESS_CONTEXT, hidden: true });

  return { stateMap, metadataMap, expandedIds, selectedIds, disabledIds };
};
