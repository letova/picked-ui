import { UNCHECKED_DATA } from '../__componentMocks__';

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

  test('has disabled unchecked end nodes with disabledByParent context', () => {
    expect(getDescendantsCheckedState(UNCHECKED_DATA, { disabledByParent: true })).toEqual({
      hasEnabledCheckedEndNodes: false,
      hasEnabledUncheckedEndNodes: false,
      hasDisabledCheckedEndNodes: false,
      hasDisabledUncheckedEndNodes: true,
    });
  });
});
