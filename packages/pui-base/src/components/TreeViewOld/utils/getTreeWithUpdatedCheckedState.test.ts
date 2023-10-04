import { PARTIALLY_CHECKED_DATA, UNCHECKED_DATA } from '../__componentMocks__';
import { forPartiallyCheckedTree, forUncheckedTree } from '../__componentMocks__/checkUseCases';

import { getTreeWithUpdatedCheckedState } from './getTreeWithUpdatedCheckedState';

describe('TreeSelect.updateTreeCheckedState', () => {
  it('check the top level parent node checks all child nodes', () => {
    expect(getTreeWithUpdatedCheckedState(forUncheckedTree.TRIGER_NODE_1, UNCHECKED_DATA)).toEqual(
      forUncheckedTree.RESULT_DATA_1,
    );
  });
  it('check the leaf node with checked siblings checks parent nodes', () => {
    expect(getTreeWithUpdatedCheckedState(forPartiallyCheckedTree.TRIGER_NODE_1_1, PARTIALLY_CHECKED_DATA)).toEqual(
      forPartiallyCheckedTree.RESULT_DATA_1_1,
    );
    expect(
      getTreeWithUpdatedCheckedState(forPartiallyCheckedTree.TRIGER_NODE_1_2, forPartiallyCheckedTree.RESULT_DATA_1_1),
    ).toEqual(forPartiallyCheckedTree.RESULT_DATA_1_2);

    expect(
      getTreeWithUpdatedCheckedState(forPartiallyCheckedTree.TRIGER_NODE_1_3, forPartiallyCheckedTree.RESULT_DATA_1_2),
    ).toEqual(forPartiallyCheckedTree.RESULT_DATA_1_3);
  });
});
