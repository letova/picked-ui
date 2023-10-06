import { NodeState } from '../TreeView.types';

import { disabledMocks, selectedMocks } from '../__testMocks__';

import { prepareMaps } from '../utils';

const getActualState = (
  stateName: 'selected' | 'indeterminate' | 'disabled',
  map: Record<string, NodeState>,
  expectedResult: [string, boolean][],
) => {
  return expectedResult.map((expected) => {
    const id = expected[0];
    return [id, map[id][stateName]];
  });
};

describe('TreeView.prepareMaps', () => {
  describe('calculates the correct selected state with', () => {
    test('the selected leaf node', () => {
      const { stateMap } = prepareMaps({ data: selectedMocks.DATA, selected: selectedMocks.SELECTED_LEAF });

      const actual = getActualState('selected', stateMap, selectedMocks.SELECTED_LEAF_RESULT);

      expect(actual).toEqual(selectedMocks.SELECTED_LEAF_RESULT);
    });

    test('the selected leaf nodes', () => {
      const { stateMap } = prepareMaps({ data: selectedMocks.DATA, selected: selectedMocks.SELECTED_LEAFS });

      const actual = getActualState('selected', stateMap, selectedMocks.SELECTED_LEAFS_RESULT);

      expect(actual).toEqual(selectedMocks.SELECTED_LEAFS_RESULT);
    });

    test('the all selected leaf nodes in subtree', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_ALL_LEAFS,
      });

      const actual = getActualState('selected', stateMap, selectedMocks.SELECTED_ALL_LEAFS_RESULT);

      expect(actual).toEqual(selectedMocks.SELECTED_ALL_LEAFS_RESULT);
    });

    test('the root parent', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_ROOT_PARENT,
      });

      const actual = getActualState('selected', stateMap, selectedMocks.SELECTED_ROOT_PARENT_RESULT);

      expect(actual).toEqual(selectedMocks.SELECTED_ROOT_PARENT_RESULT);
    });

    test('the parent', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_PARENT,
      });

      const actual = getActualState('selected', stateMap, selectedMocks.SELECTED_PARENT_RESULT);

      expect(actual).toEqual(selectedMocks.SELECTED_PARENT_RESULT);
    });

    test('parents', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_PARENTS,
      });

      const actual = getActualState('selected', stateMap, selectedMocks.SELECTED_PARENTS_RESULT);

      expect(actual).toEqual(selectedMocks.SELECTED_PARENTS_RESULT);
    });
  });

  describe('calculates the correct indeterminate state with', () => {
    test('the selected leaf node', () => {
      const { stateMap } = prepareMaps({ data: selectedMocks.DATA, selected: selectedMocks.SELECTED_LEAF });

      const actual = getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_LEAF_RESULT);

      expect(actual).toEqual(selectedMocks.INDETERMINATE_LEAF_RESULT);
    });

    test('the selected leaf nodes', () => {
      const { stateMap } = prepareMaps({ data: selectedMocks.DATA, selected: selectedMocks.SELECTED_LEAFS });

      const actual = getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_LEAFS_RESULT);

      expect(actual).toEqual(selectedMocks.INDETERMINATE_LEAFS_RESULT);
    });

    test('the all selected leaf nodes in subtree', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_ALL_LEAFS,
      });

      const actual = getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_ALL_LEAFS_RESULT);

      expect(actual).toEqual(selectedMocks.INDETERMINATE_ALL_LEAFS_RESULT);
    });

    test('the root parent', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_ROOT_PARENT,
      });

      const actual = getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_ROOT_PARENT_RESULT);

      expect(actual).toEqual(selectedMocks.INDETERMINATE_ROOT_PARENT_RESULT);
    });

    test('the parent', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_PARENT,
      });

      const actual = getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_PARENT_RESULT);

      expect(actual).toEqual(selectedMocks.INDETERMINATE_PARENT_RESULT);
    });

    test('the parents', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selected: selectedMocks.SELECTED_PARENTS,
      });

      const actual = getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_PARENTS_RESULT);

      expect(actual).toEqual(selectedMocks.INDETERMINATE_PARENTS_RESULT);
    });
  });

  describe('calculates the correct disabled state with', () => {
    test('the disabled leaf node', () => {
      const { stateMap } = prepareMaps({ data: disabledMocks.DATA, disabled: disabledMocks.DISABLED_LEAF });

      const actual = getActualState('disabled', stateMap, disabledMocks.DISABLED_LEAF_RESULT);

      expect(actual).toEqual(disabledMocks.DISABLED_LEAF_RESULT);
    });

    test('the parent', () => {
      const { stateMap } = prepareMaps({
        data: disabledMocks.DATA,
        disabled: disabledMocks.DISABLED_PARENT,
      });

      const actual = getActualState('disabled', stateMap, disabledMocks.DISABLED_PARENT_RESULT);

      expect(actual).toEqual(disabledMocks.DISABLED_PARENT_RESULT);
    });
  });
});
