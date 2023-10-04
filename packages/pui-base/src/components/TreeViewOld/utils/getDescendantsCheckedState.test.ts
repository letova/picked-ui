import { PARTIALLY_CHECKED_DATA, UNCHECKED_DATA } from '../__componentMocks__';

import { getDescendantsCheckedState } from './getDescendantsCheckedState';

describe('TreeSelect.getDescendantsCheckedState', () => {
  test('has enabled unchecked leaf nodes', () => {
    expect(getDescendantsCheckedState(UNCHECKED_DATA)).toEqual({
      hasEnabledCheckedLeafNodes: false,
      hasEnabledUncheckedLeafNodes: true,
      hasDisabledCheckedLeafNodes: false,
      hasDisabledUncheckedLeafNodes: false,
    });
  });

  test('has enabled checked & unchecked leaf nodes', () => {
    expect(getDescendantsCheckedState(PARTIALLY_CHECKED_DATA)).toEqual({
      hasEnabledCheckedLeafNodes: true,
      hasEnabledUncheckedLeafNodes: true,
      hasDisabledCheckedLeafNodes: false,
      hasDisabledUncheckedLeafNodes: false,
    });
  });

  test('has disabled unchecked leaf nodes with disabledByParent context', () => {
    expect(getDescendantsCheckedState(UNCHECKED_DATA, { disabledByParent: true })).toEqual({
      hasEnabledCheckedLeafNodes: false,
      hasEnabledUncheckedLeafNodes: false,
      hasDisabledCheckedLeafNodes: false,
      hasDisabledUncheckedLeafNodes: true,
    });
  });
});
