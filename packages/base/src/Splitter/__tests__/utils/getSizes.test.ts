import { getSizes } from '../../utils';

describe('Splitter.getSizes', () => {
  test('calculates [undefined, undefined]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: undefined }, { size: undefined }] });

    expect(result).toEqual([
      { size: 500, percentSize: 50 },
      { size: 500, percentSize: 50 },
    ]);
  });

  test('calculates [300, undefined]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: 300 }, { size: undefined }] });

    expect(result).toEqual([
      { size: 300, percentSize: 30 },
      { size: 700, percentSize: 70 },
    ]);
  });

  test('calculates [50%, undefined]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: '50%' }, { size: undefined }] });

    expect(result).toEqual([
      { size: 500, percentSize: 50 },
      { size: 500, percentSize: 50 },
    ]);
  });

  test('calculates [200, 0]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: 200 }, { size: 0 }] });

    expect(result).toEqual([
      { size: 1000, percentSize: 100 },
      { size: 0, percentSize: 0 },
    ]);
  });

  test('calculates [20%, 0]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: '20%' }, { size: 0 }] });

    expect(result).toEqual([
      { size: 1000, percentSize: 100 },
      { size: 0, percentSize: 0 },
    ]);
  });

  test('calculates [200, 600]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: 200 }, { size: 600 }] });

    expect(result).toEqual([
      { size: 300, percentSize: 30 },
      { size: 700, percentSize: 70 },
    ]);
  });

  test('calculates [30%, 30%]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: '30%' }, { size: '30%' }] });

    expect(result).toEqual([
      { size: 500, percentSize: 50 },
      { size: 500, percentSize: 50 },
    ]);
  });

  test('calculates [200, 800]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: 200 }, { size: 800 }] });

    expect(result).toEqual([
      { size: 200, percentSize: 20 },
      { size: 800, percentSize: 80 },
    ]);
  });

  test('calculates [40%, 60%]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: '40%' }, { size: '60%' }] });

    expect(result).toEqual([
      { size: 400, percentSize: 40 },
      { size: 600, percentSize: 60 },
    ]);
  });

  test('calculates [600, 600]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: 600 }, { size: 600 }] });

    expect(result).toEqual([
      { size: 500, percentSize: 50 },
      { size: 500, percentSize: 50 },
    ]);
  });

  test.skip('calculates [50%, 150%]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: '50%' }, { size: '150%' }] });

    expect(result).toEqual([
      { size: 250, percentSize: 25 },
      { size: 750, percentSize: 75 },
    ]);
  });
});
