import { NodeState } from '../../TreeView.types';

import { disabledMocks, expandedMocks, selectedMocks } from '../../__testMocks__';

import { prepareMapsForMultiSelect as prepareMaps } from '../../utils';

const getActualState = (
  stateName: 'expanded' | 'selected' | 'indeterminate' | 'disabled',
  map: Record<string, NodeState>,
  expectedResult: [string, boolean][],
) => {
  return expectedResult.map((expected) => {
    const id = expected[0];
    return [id, map[id][stateName]];
  });
};

describe('TreeView.prepareMaps', () => {
  describe('calculates the correct expanded state map with', () => {
    test('the node', () => {
      const { stateMap } = prepareMaps({ data: expandedMocks.DATA, expandedIds: expandedMocks.EXPANDED_NODE });

      const actual = getActualState('expanded', stateMap, expandedMocks.EXPANDED_NODE_RESULT);

      expect(actual).toEqual(expandedMocks.EXPANDED_NODE_RESULT);
    });

    test('some nodes', () => {
      const { stateMap } = prepareMaps({
        data: expandedMocks.DATA,
        expandedIds: expandedMocks.EXPANDED_NODES,
      });

      const actual = getActualState('expanded', stateMap, expandedMocks.EXPANDED_NODES_RESULT);

      expect(actual).toEqual(expandedMocks.EXPANDED_NODES_RESULT);
    });

    test('all nodes', () => {
      const { stateMap } = prepareMaps({
        data: expandedMocks.DATA,
        expandedIds: expandedMocks.EXPANDED_ALL_NODES,
      });

      const actual = getActualState('expanded', stateMap, expandedMocks.EXPANDED_ALL_NODES_RESULT);

      expect(actual).toEqual(expandedMocks.EXPANDED_ALL_NODES_RESULT);
    });

    test('level', () => {
      const { stateMap } = prepareMaps({
        data: expandedMocks.DATA,
        expandedIds: expandedMocks.EXPANDED_LEVEL,
      });

      const actual = getActualState('expanded', stateMap, expandedMocks.EXPANDED_LEVEL_RESULT);

      expect(actual).toEqual(expandedMocks.EXPANDED_LEVEL_RESULT);
    });
  });

  describe('calculates the correct selected state map with', () => {
    test('the leaf node', () => {
      const { stateMap } = prepareMaps({ data: selectedMocks.DATA, selectedIds: selectedMocks.SELECTED_LEAF });

      expect(getActualState('selected', stateMap, selectedMocks.SELECTED_LEAF_RESULT)).toEqual(
        selectedMocks.SELECTED_LEAF_RESULT,
      );

      expect(getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_LEAF_RESULT)).toEqual(
        selectedMocks.INDETERMINATE_LEAF_RESULT,
      );
    });

    test('some leaf nodes', () => {
      const { stateMap } = prepareMaps({ data: selectedMocks.DATA, selectedIds: selectedMocks.SELECTED_LEAFS });

      expect(getActualState('selected', stateMap, selectedMocks.SELECTED_LEAFS_RESULT)).toEqual(
        selectedMocks.SELECTED_LEAFS_RESULT,
      );

      expect(getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_LEAFS_RESULT)).toEqual(
        selectedMocks.INDETERMINATE_LEAFS_RESULT,
      );
    });

    test('all leaf nodes (in subtree)', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selectedIds: selectedMocks.SELECTED_ALL_LEAFS,
      });

      expect(getActualState('selected', stateMap, selectedMocks.SELECTED_ALL_LEAFS_RESULT)).toEqual(
        selectedMocks.SELECTED_ALL_LEAFS_RESULT,
      );

      expect(getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_ALL_LEAFS_RESULT)).toEqual(
        selectedMocks.INDETERMINATE_ALL_LEAFS_RESULT,
      );
    });

    test('the root parent', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selectedIds: selectedMocks.SELECTED_ROOT_PARENT,
      });

      expect(getActualState('selected', stateMap, selectedMocks.SELECTED_ROOT_PARENT_RESULT)).toEqual(
        selectedMocks.SELECTED_ROOT_PARENT_RESULT,
      );

      expect(getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_ROOT_PARENT_RESULT)).toEqual(
        selectedMocks.INDETERMINATE_ROOT_PARENT_RESULT,
      );
    });

    test('the parent', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selectedIds: selectedMocks.SELECTED_PARENT,
      });

      expect(getActualState('selected', stateMap, selectedMocks.SELECTED_PARENT_RESULT)).toEqual(
        selectedMocks.SELECTED_PARENT_RESULT,
      );

      expect(getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_PARENT_RESULT)).toEqual(
        selectedMocks.INDETERMINATE_PARENT_RESULT,
      );
    });

    test('parents', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selectedIds: selectedMocks.SELECTED_PARENTS,
      });

      expect(getActualState('selected', stateMap, selectedMocks.SELECTED_PARENTS_RESULT)).toEqual(
        selectedMocks.SELECTED_PARENTS_RESULT,
      );

      expect(getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_PARENTS_RESULT)).toEqual(
        selectedMocks.INDETERMINATE_PARENTS_RESULT,
      );
    });

    test('all', () => {
      const { stateMap } = prepareMaps({
        data: selectedMocks.DATA,
        selectedIds: selectedMocks.SELECTED_ALL,
      });

      expect(getActualState('selected', stateMap, selectedMocks.SELECTED_ALL_RESULT)).toEqual(
        selectedMocks.SELECTED_ALL_RESULT,
      );

      expect(getActualState('indeterminate', stateMap, selectedMocks.INDETERMINATE_ALL_RESULT)).toEqual(
        selectedMocks.INDETERMINATE_ALL_RESULT,
      );
    });
  });

  describe('calculates the correct disabled state map with', () => {
    test('the leaf node', () => {
      const { stateMap } = prepareMaps({ data: disabledMocks.DATA, disabledIds: disabledMocks.DISABLED_LEAF });

      const actual = getActualState('disabled', stateMap, disabledMocks.DISABLED_LEAF_RESULT);

      expect(actual).toEqual(disabledMocks.DISABLED_LEAF_RESULT);
    });

    test('the parent', () => {
      const { stateMap } = prepareMaps({
        data: disabledMocks.DATA,
        disabledIds: disabledMocks.DISABLED_PARENT,
      });

      const actual = getActualState('disabled', stateMap, disabledMocks.DISABLED_PARENT_RESULT);

      expect(actual).toEqual(disabledMocks.DISABLED_PARENT_RESULT);
    });
  });
});
