import { act, renderHook } from '@testing-library/react';

import { useNumberInput } from '../useNumberInput';

describe('useNumberInput', () => {
  it('should get input number', () => {
    const mockFn = jest.fn();

    const { result } = renderHook(() => useNumberInput({ value: undefined }, mockFn));

    act(() => {
      result.current.onChange('1');
    });

    expect(mockFn).toHaveBeenCalledWith(1, 0);
  });
});
