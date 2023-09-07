import { act, renderHook } from '@testing-library/react';

import { useNumberInput } from '../useNumberInput';

describe('useNumberInput', () => {
  it.each`
    input      | expected
    ${'3'}     | ${[3, 0]}
    ${'1.05'}  | ${[1.05, 2]}
    ${'1.00'}  | ${[1, 2]}
    ${'-1'}    | ${[-1, 0]}
    ${'-1.05'} | ${[-1.05, 2]}
    ${'-1.00'} | ${[-1, 2]}
  `(
    'should call onChange with args "$expected" when input "$input"',
    ({ input, expected }: { input: string; expected: number[] }) => {
      const mockFn = jest.fn();

      const { result } = renderHook(() => useNumberInput({ value: undefined }, mockFn));

      act(() => {
        result.current.onChange(input);
      });

      expect(mockFn).toHaveBeenCalledWith(...expected);
    },
  );

  it.each`
    input
    ${'.'}
    ${'3.'}
    ${'-'}
    ${'-.'}
  `('shouldn\'t call onChange when input "$input"', ({ input }: { input: string }) => {
    const mockFn = jest.fn();

    const { result } = renderHook(() => useNumberInput({ value: undefined }, mockFn));

    act(() => {
      result.current.onChange(input);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should output value with a comma separator', () => {
    const { result } = renderHook(() => useNumberInput({ value: 1.0, fractionDigits: 2, separator: ',' }, () => {}));

    expect(result.current.value).toBe('1,00');
  });
});
