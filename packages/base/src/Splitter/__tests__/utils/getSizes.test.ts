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

  test('calculates [40%, 60%]', () => {
    const result = getSizes({ containerSize: 1000, defaultChildSizes: [{ size: '40%' }, { size: '60%' }] });

    expect(result).toEqual([
      { size: 400, percentSize: 40 },
      { size: 600, percentSize: 60 },
    ]);
  });
});
