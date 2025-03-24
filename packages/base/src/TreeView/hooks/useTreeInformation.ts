import { useRef } from 'react';

import { NodeMetadata, NodeState, TreeViewNode, TreeViewProps } from '../TreeView.types';

import { calculateSelectedIds, prepareMapsForMultiSelect, prepareMapsForSingleSelect } from '../utils';

const STATE_FIELDS = ['expandedIds', 'selectedIds', 'disabledIds'];

type TreeInformationUserState = Pick<TreeViewProps, 'expandedIds' | 'selectedIds' | 'disabledIds'>;

class TreeInformation {
  public expandedIds: string[];
  public selectedIds: string[];
  public disabledIds: string[];

  #data: TreeViewNode[];
  #state: TreeInformationUserState;
  #stateMap: Record<string, NodeState>;
  #metadataMap: Record<string, NodeMetadata>;

  constructor(mode: TreeViewProps['mode'], data: TreeViewNode[], state: TreeInformationUserState) {
    this.expandedIds = [];
    this.selectedIds = [];
    this.disabledIds = [];

    this.#data = [];
    this.#state = {};
    this.#stateMap = {};
    this.#metadataMap = {};

    this.update(mode, data, state);
  }

  private updateDeps(data: TreeViewNode[], state: TreeInformationUserState) {
    this.#data = data;
    this.#state = STATE_FIELDS.reduce<TreeInformationUserState>((result, field) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore fix type
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result[field] = state[field];
      return result;
    }, {});
  }

  public getStateById(id: string) {
    return this.#stateMap[id];
  }

  public getMetadataById(id: string) {
    return this.#metadataMap[id];
  }

  public update(mode: TreeViewProps['mode'], data: TreeViewNode[], state: TreeInformationUserState) {
    const prepareMaps = mode === 'single-select' ? prepareMapsForSingleSelect : prepareMapsForMultiSelect;

    const { stateMap, metadataMap, expandedIds, selectedIds, disabledIds } = prepareMaps({
      data,
      ...state,
    });

    this.expandedIds = expandedIds;
    this.selectedIds = selectedIds;
    this.disabledIds = disabledIds;

    console.log('expandedIds', expandedIds);

    this.#stateMap = stateMap;
    this.#metadataMap = metadataMap;

    this.updateDeps(data, state);
  }

  public shouldUpdate(nextData: TreeViewNode[], nextState: TreeInformationUserState) {
    if (nextData !== this.#data) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore fix type
    if (STATE_FIELDS.some((field) => nextState[field] !== this.#state[field])) {
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

  public filterSelectedParentIds(selectedIds: string[] | undefined) {
    if (!selectedIds) {
      return undefined;
    }

    const selectedIdSet = new Set(selectedIds);
    const result: string[] = [];

    const process = <T extends { children?: T[]; id: string }>(data: T[]) => {
      return data.forEach((node) => {
        if (selectedIdSet.has(node.id)) {
          result.push(node.id);
        } else if (node.children?.length) {
          process(node.children);
        }
      });
    };

    process(this.#data);

    return result;
  }

  public filterSelectedChildIds(selectedIds: string[] | undefined) {
    if (!selectedIds) {
      return undefined;
    }

    const selectedIdSet = new Set(selectedIds);
    const result: string[] = [];

    const process = <T extends { children?: T[]; id: string }>(data: T[]) => {
      return data.forEach((node) => {
        if (selectedIdSet.has(node.id) && !node.children?.length) {
          result.push(node.id);
        }

        if (node.children?.length) {
          process(node.children);
        }
      }, [] as T[]);
    };

    process(this.#data);

    return result;
  }
}

const useTreeInformation = (
  mode: TreeViewProps['mode'],
  data: TreeViewNode[] | undefined = [],
  state: Pick<TreeViewProps, 'expandedIds' | 'selectedIds' | 'disabledIds' | 'search'>,
) => {
  const informationRef: React.MutableRefObject<TreeInformation | null> = useRef(null);

  if (informationRef.current === null) {
    informationRef.current = new TreeInformation(mode, data, state);
  } else if (informationRef.current.shouldUpdate(data, state)) {
    informationRef.current.update(mode, data, state);
  }

  return informationRef as React.MutableRefObject<TreeInformation>;
};

export { useTreeInformation, TreeInformation };
