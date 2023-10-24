import { useRef } from 'react';

import { NodeMetadata, NodeState, NodeType, TreeViewProps } from './TreeView.types';

import { calculateSelectedIds, prepareMapsForMultiSelect, prepareMapsForSingleSelect } from './utils';

const STATE_FIELDS = ['expanded', 'selected', 'disabled'];

type TreeInformationUserState = Pick<TreeViewProps, 'expanded' | 'selected' | 'disabled'>;

class TreeInformation {
  public expandedIds: string[];
  public selectedIds: string[];
  public disabledIds: string[];

  #data: NodeType[];
  #prevState: TreeInformationUserState;
  #stateMap: Record<string, NodeState>;
  #metadataMap: Record<string, NodeMetadata>;

  constructor(mode: TreeViewProps['mode'], data: NodeType[], state: TreeInformationUserState) {
    this.expandedIds = [];
    this.selectedIds = [];
    this.disabledIds = [];

    this.#data = data;
    this.#prevState = STATE_FIELDS.reduce<TreeInformationUserState>((result, field) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore fix type
      result[field] = undefined;
      return result;
    }, {});

    this.#stateMap = {};
    this.#metadataMap = {};

    this.update(mode, data, state);
  }

  public getStateById(id: string) {
    return this.#stateMap[id];
  }

  public getMetadataById(id: string) {
    return this.#metadataMap[id];
  }

  public update(mode: TreeViewProps['mode'], data: NodeType[], state: TreeInformationUserState) {
    const prepareMaps = mode === 'single-select' ? prepareMapsForSingleSelect : prepareMapsForMultiSelect;

    const { stateMap, metadataMap, expandedIds, selectedIds, disabledIds } = prepareMaps({
      data,
      ...state,
    });

    this.expandedIds = expandedIds;
    this.selectedIds = selectedIds;
    this.disabledIds = disabledIds;

    this.#stateMap = stateMap;
    this.#metadataMap = metadataMap;
  }

  public shouldUpdate(nextData: NodeType[], nextState: TreeInformationUserState) {
    if (nextData !== this.#data) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore fix type
    if (STATE_FIELDS.some((field) => nextState[field] !== this.#prevState[field])) {
      return true;
    }

    return false;
  }

  public calculateSelectedIds(triggerNodeId: string) {
    return calculateSelectedIds(this.#data, {
      triggerNodeId,
      selectedIds: this.selectedIds,
      disabledIds: this.disabledIds,
      getMetadataById: this.getMetadataById.bind(this),
    });
  }
}

const useTreeInformation = (
  mode: TreeViewProps['mode'],
  data: NodeType[] | undefined = [],
  state: Pick<TreeViewProps, 'expanded' | 'selected' | 'disabled'>,
) => {
  const informationRef = useRef(new TreeInformation(mode, data, state));

  if (informationRef.current.shouldUpdate(data, state)) {
    informationRef.current.update(mode, data, state);
  }

  return informationRef;
};

export { useTreeInformation, TreeInformation };
