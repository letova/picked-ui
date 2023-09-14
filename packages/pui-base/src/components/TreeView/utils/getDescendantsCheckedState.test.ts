import { PARTIALLY_CHECKED_DATA, UNCHECKED_DATA } from '../__componentMocks__';

import { getDescendantsCheckedState } from './getDescendantsCheckedState';

describe('TreeSelect.getDescendantsCheckedState', () => {
  test('has enabled unchecked end nodes', () => {
    expect(getDescendantsCheckedState(UNCHECKED_DATA)).toEqual({
      hasEnabledCheckedEndNodes: false,
      hasEnabledUncheckedEndNodes: true,
      hasDisabledCheckedEndNodes: false,
      hasDisabledUncheckedEndNodes: false,
    });
  });

  test('has enabled checked & unchecked end nodes', () => {
    expect(getDescendantsCheckedState(PARTIALLY_CHECKED_DATA)).toEqual({
      hasEnabledCheckedEndNodes: true,
      hasEnabledUncheckedEndNodes: true,
      hasDisabledCheckedEndNodes: false,
      hasDisabledUncheckedEndNodes: false,
    });
  });

  test('has disabled unchecked end nodes with disabledByParent context', () => {
    expect(getDescendantsCheckedState(UNCHECKED_DATA, { disabledByParent: true })).toEqual({
      hasEnabledCheckedEndNodes: false,
      hasEnabledUncheckedEndNodes: false,
      hasDisabledCheckedEndNodes: false,
      hasDisabledUncheckedEndNodes: true,
    });
  });
});
