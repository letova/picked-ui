import { useRef } from 'react';

import { NodeMetadata, NodeState, NodeType, TreeViewProps } from './TreeView.types';

import { prepareMaps } from './utils';

const STATE_FIELDS = ['expanded', 'selected', 'disabled'];

type TreeInformationUserState = Pick<TreeViewProps, 'expanded' | 'selected' | 'disabled'>;

class TreeInformation {
  public expandedIds: string[];
  public selectedIds: string[];

  #prevData: NodeType[];
  #prevState: TreeInformationUserState;
  #stateMap: Record<string, NodeState>;
  #metadataMap: Record<string, NodeMetadata>;

  constructor(data: NodeType[], state: TreeInformationUserState) {
    this.expandedIds = [];
    this.selectedIds = [];

    this.#prevData = [];
    this.#prevState = STATE_FIELDS.reduce<TreeInformationUserState>((result, field) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore fix type
      result[field] = undefined;
      return result;
    }, {});

    this.#stateMap = {};
    this.#metadataMap = {};

    this.update(data, state);
  }

  public getStateById(id: string) {
    return this.#stateMap[id];
  }

  public getMetadataById(id: string) {
    return this.#metadataMap[id];
  }

  public update(data: NodeType[], state: TreeInformationUserState) {
    const { stateMap, metadataMap, expandedIds, selectedIds } = prepareMaps({ data, ...state });

    this.expandedIds = expandedIds;
    this.selectedIds = selectedIds;

    this.#stateMap = stateMap;
    this.#metadataMap = metadataMap;
  }

  public shouldUpdate(nextData: NodeType[], nextState: TreeInformationUserState) {
    if (nextData !== this.#prevData) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore fix type
    if (STATE_FIELDS.some((field) => nextState[field] !== this.#prevState[field])) {
      return true;
    }

    return false;
  }
}

const useTreeInformation = (
  data: NodeType[] | undefined = [],
  state: Pick<TreeViewProps, 'expanded' | 'selected' | 'disabled'>,
) => {
  const informationRef = useRef(new TreeInformation(data, state));

  if (informationRef.current.shouldUpdate(data, state)) {
    informationRef.current.update(data, state);
  }

  return informationRef;
};

export { useTreeInformation, TreeInformation };