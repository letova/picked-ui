import { useRef } from 'react';

import { NodeMetadata, NodeState, NodeType, TreeViewProps } from './TreeView.types';

import { prepareMaps } from './utils';

class TreeInformation {
  public expandedIds: string[];
  public selectedIds: string[];
  #stateMap: Record<string, NodeState>;
  #metadataMap: Record<string, NodeMetadata>;

  constructor() {
    this.expandedIds = [];
    this.selectedIds = [];
    this.#stateMap = {};
    this.#metadataMap = {};
  }

  public getStateById(id: string) {
    return this.#stateMap[id];
  }

  public getMetadataById(id: string) {
    return this.#metadataMap[id];
  }

  public update(data: NodeType[], state: Pick<TreeViewProps, 'expanded' | 'selected' | 'disabled'>) {
    const { stateMap, metadataMap } = prepareMaps({ data, ...state });

    this.#stateMap = stateMap;
    this.#metadataMap = metadataMap;
  }
}

const useTreeInformation = (
  data: NodeType[] | undefined = [],
  state: Pick<TreeViewProps, 'expanded' | 'selected' | 'disabled'>,
) => {
  const informationRef = useRef(new TreeInformation());

  informationRef.current.update(data, state);

  return informationRef;
};

export { useTreeInformation, TreeInformation };
