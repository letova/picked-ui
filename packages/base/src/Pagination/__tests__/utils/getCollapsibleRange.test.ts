import { getCollapsibleRange } from '../../utils';

describe('Pagination.getCollapsibleRange', () => {
  test('calculates { page: 1, pageCount: 5 }', () => {
    const result = getCollapsibleRange({ page: 1, pageCount: 5 });

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('calculates { page: 1, pageCount: 10 }', () => {
    const result = getCollapsibleRange({ page: 1, pageCount: 10 });

    expect(result).toEqual([1, 2, 3, 4, 5, 'end-ellipsis', 10]);
  });

  test('calculates { page: 5, pageCount: 10 }', () => {
    const result = getCollapsibleRange({ page: 5, pageCount: 10 });

    expect(result).toEqual([1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10]);
  });

  test('calculates { page: 6, pageCount: 12, siblingCount: 2 }', () => {
    const result = getCollapsibleRange({ page: 6, pageCount: 12, siblingCount: 2 });

    expect(result).toEqual([1, 'start-ellipsis', 4, 5, 6, 7, 8, 'end-ellipsis', 12]);
  });

  test('calculates { page: 2, pageCount: 10, boundaryCount: 0 }', () => {
    const result = getCollapsibleRange({ page: 2, pageCount: 10, boundaryCount: 0 });

    expect(result).toEqual([1, 2, 3, 4, 'end-ellipsis']);
  });
});
