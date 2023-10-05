import { NodeMetadata, NodeState, NodeType, TreeViewProps } from '../TreeView.types';

const getSelectedIdsMap = ({ selected }: TreeViewProps): Record<string, true> => {
  if (!selected) {
    return {};
  }

  if (selected === 'all') {
    return {}; // TODO data reduce
  }

  if (Array.isArray(selected)) {
    return selected.reduce<Record<string, true>>((result, id) => {
      result[id] = true;
      return result;
    }, {});
  }

  return { [selected]: true };
};

const getExpandedIdsMap = ({ expanded }: TreeViewProps): Record<string, true> => {
  if (!expanded || typeof expanded === 'number') {
    return {};
  }

  if (expanded === 'all') {
    return {}; // TODO data reduce
  }

  if (Array.isArray(expanded)) {
    return expanded.reduce<Record<string, true>>((result, id) => {
      result[id] = true;
      return result;
    }, {});
  }

  return { [expanded]: true };
};

const getDisabledIdsMap = ({ disabled }: TreeViewProps): Record<string, true> => {
  if (!disabled) {
    return {};
  }

  if (Array.isArray(disabled)) {
    return disabled.reduce<Record<string, true>>((result, id) => {
      result[id] = true;
      return result;
    }, {});
  }

  return { [disabled]: true };
};

interface ProcessContext {
  parentId?: string;
  parentIsDisabled: boolean;
  level: number;
}

const INITIAL_PROCESS_CONTEXT: ProcessContext = {
  parentId: undefined,
  parentIsDisabled: false,
  level: 1,
};

const INITIAL_NODE_STATE: NodeState = {
  selected: false,
  expanded: false,
  disabled: false,
  disabledByParent: false,
  indeterminate: false,
};

const INITIAL_NODE_METADATA: NodeMetadata = {
  parentId: undefined,
  left: 0,
  right: 0,
};

interface Result {
  stateMap: Record<string, NodeState>;
  metadataMap: Record<string, NodeMetadata>;
}

export const prepareMapsFromProps = (props: TreeViewProps): Result => {
  const selectedIdsMap = getSelectedIdsMap(props);
  const expandedIdsMap = getExpandedIdsMap(props);
  const disabledIdsMap = getDisabledIdsMap(props);

  console.log('expandedIdsMap', expandedIdsMap);

  const stateMap: Record<string, NodeState> = {};
  const metadataMap: Record<string, NodeMetadata> = {};

  if (!props.data) {
    return { stateMap: {}, metadataMap: {} };
  }

  let nestedSetModelCounter = 0;

  const process = (data: NodeType[], context: ProcessContext) => {
    data.forEach((node) => {
      const state: NodeState = { ...INITIAL_NODE_STATE };
      const metadata: NodeMetadata = { ...INITIAL_NODE_METADATA };

      nestedSetModelCounter += 1;
      metadata.left = nestedSetModelCounter;
      /**
       * Guess right
       */
      metadata.right = nestedSetModelCounter + 1;
      metadata.parentId = context.parentId;

      state.indeterminate = false; // TODO
      state.selected = Boolean(selectedIdsMap[node.id]);
      state.expanded =
        typeof props.expanded === 'number' ? props.expanded >= context.level : Boolean(expandedIdsMap[node.id]);
      state.disabled = Boolean(disabledIdsMap[node.id]);
      state.disabledByParent = context.parentIsDisabled;

      if (node.children) {
        process(node.children, {
          parentId: node.id,
          parentIsDisabled: state.disabled,
          level: context.level + 1,
        });

        metadata.right = nestedSetModelCounter + 1;
      }

      stateMap[node.id] = state;
      console.log(node.id, state);
      metadataMap[node.id] = metadata;
      nestedSetModelCounter += 1;
    });

    console.log('stateMap it', stateMap);
  };

  process(props.data, INITIAL_PROCESS_CONTEXT);

  return { stateMap, metadataMap };
};
