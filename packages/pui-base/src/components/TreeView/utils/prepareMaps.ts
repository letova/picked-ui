import { NodeMetadata, NodeState, NodeType, TreeViewProps } from '../TreeView.types';

const getIdsMap = (state: string | string[]): Record<string, true> => {
  if (Array.isArray(state)) {
    return state.reduce<Record<string, true>>((result, id) => {
      result[id] = true;
      return result;
    }, {});
  }

  return { [state]: true };
};

const getSelectedIdsMap = (selected: TreeViewProps['selected']): Record<string, true> => {
  if (!selected || selected === 'all') {
    return {};
  }

  return getIdsMap(selected);
};

const getExpandedIdsMap = (expanded: TreeViewProps['expanded']): Record<string, true> => {
  if (!expanded || expanded === 'all' || typeof expanded === 'number') {
    return {};
  }

  return getIdsMap(expanded);
};

const getDisabledIdsMap = (disabled: TreeViewProps['disabled']): Record<string, true> => {
  if (!disabled) {
    return {};
  }

  return getIdsMap(disabled);
};

interface ProcessContext {
  parentId?: string;
  parentIsSelected: boolean;
  parentIsDisabled: boolean;
  level: number;
}

const INITIAL_PROCESS_CONTEXT: ProcessContext = {
  parentId: undefined,
  parentIsSelected: false,
  parentIsDisabled: false,
  level: 1,
};

const INITIAL_NODE_STATE: NodeState = {
  selected: false,
  expanded: false,
  disabled: false,
  indeterminate: false,
};

const INITIAL_NODE_METADATA: NodeMetadata = {
  parentId: undefined,
  left: 0,
  right: 0,
};

interface PrepareMapsResult {
  stateMap: Record<string, NodeState>;
  metadataMap: Record<string, NodeMetadata>;
  selectedIds: string[];
  expandedIds: string[];
}

export const prepareMaps = (props: TreeViewProps): PrepareMapsResult => {
  const selectedIdsMap = getSelectedIdsMap(props.selected);
  const expandedIdsMap = getExpandedIdsMap(props.expanded);
  const disabledIdsMap = getDisabledIdsMap(props.disabled);

  const stateMap: Record<string, NodeState> = {};
  const metadataMap: Record<string, NodeMetadata> = {};
  const expandedIds: string[] = [];
  const selectedIds: string[] = [];

  if (!props.data) {
    return { stateMap: {}, metadataMap: {}, selectedIds: [], expandedIds: [] };
  }

  let nestedSetModelCounter = 0;

  const process = (data: NodeType[], context: ProcessContext) => {
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

      /**
       * Node state
       */
      let selected = props.selected === 'all' || Boolean(selectedIdsMap[node.id]) || context.parentIsSelected || false;
      let indeterminate = false;

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

        right = nestedSetModelCounter + 1;
      }

      metadata.right = right;
      state.selected = selected;
      state.indeterminate = indeterminate;

      /**
       * Sets maps
       */
      if (state.expanded) {
        expandedIds.push(node.id);
      }

      if (state.selected) {
        selectedIds.push(node.id);
      }

      stateMap[node.id] = state;
      metadataMap[node.id] = metadata;

      nestedSetModelCounter += 1;
    });
  };

  process(props.data, INITIAL_PROCESS_CONTEXT);

  return { stateMap, metadataMap, expandedIds, selectedIds };
};
