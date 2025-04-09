import { TreeViewProps } from '../TreeView.types';

const getIdsMap = (state: string | string[]): Record<string, true> => {
  if (Array.isArray(state)) {
    return state.reduce<Record<string, true>>((result, id) => {
      result[id] = true;
      return result;
    }, {});
  }

  return { [state]: true };
};

export const getSelectedIdsMap = (selected: TreeViewProps['selectedIds']): Record<string, true> => {
  if (!selected || selected === 'all') {
    return {};
  }

  return getIdsMap(selected);
};

export const getExpandedIdsMap = (expanded: TreeViewProps['expandedIds']): Record<string, true> => {
  if (!expanded || expanded === 'all' || typeof expanded === 'number') {
    return {};
  }

  return getIdsMap(expanded);
};

export const getDisabledIdsMap = (disabled: TreeViewProps['disabledIds']): Record<string, true> => {
  if (!disabled) {
    return {};
  }

  return getIdsMap(disabled);
};
