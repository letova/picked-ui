import { addDay, addMonth, subtractDay, subtractMonth } from '..';

describe('date-utils', () => {
  it('addMonth', () => {
    expect(addMonth(new Date('2024-02-01T01:00:00.000Z')).toJSON()).toBe(new Date('2024-03-01T01:00:00.000Z').toJSON());
    expect(addMonth(new Date('2024-01-31T02:00:00.000Z')).toJSON()).toBe(new Date('2024-02-29T02:00:00.000Z').toJSON());
    expect(addMonth(new Date('2024-12-01T03:00:00.000Z')).toJSON()).toBe(new Date('2025-01-01T03:00:00.000Z').toJSON());
  });

  it('addMonth rolling', () => {
    expect(addMonth(new Date('2024-12-01T01:00:00.000Z'), { isRolling: true }).toJSON()).toBe(
      new Date('2024-01-01T01:00:00.000Z').toJSON(),
    );
  });

  it('addDay', () => {
    expect(addDay(new Date('2024-02-01T01:00:00.000Z')).toJSON()).toBe(new Date('2024-02-02T01:00:00.000Z').toJSON());
    expect(addDay(new Date('2024-02-29T02:00:00.000Z')).toJSON()).toBe(new Date('2024-03-01T02:00:00.000Z').toJSON());
    expect(addDay(new Date('2024-03-31T03:00:00.000Z')).toJSON()).toBe(new Date('2024-04-01T03:00:00.000Z').toJSON());
  });

  it('addDay rolling', () => {
    expect(addDay(new Date('2024-02-01T01:00:00.000Z'), { isRolling: true }).toJSON()).toBe(
      new Date('2024-02-02T01:00:00.000Z').toJSON(),
    );
    expect(addDay(new Date('2024-02-29T02:00:00.000Z'), { isRolling: true }).toJSON()).toBe(
      new Date('2024-02-01T02:00:00.000Z').toJSON(),
    );
    expect(addDay(new Date('2025-02-28T02:00:00.000Z'), { isRolling: true }).toJSON()).toBe(
      new Date('2025-02-01T02:00:00.000Z').toJSON(),
    );
    expect(addDay(new Date('2024-03-31T02:00:00.000Z'), { isRolling: true }).toJSON()).toBe(
      new Date('2024-03-01T02:00:00.000Z').toJSON(),
    );
  });

  it('subtractMonth', () => {
    expect(subtractMonth(new Date('2024-02-01T01:00:00.000Z')).toJSON()).toBe(
      new Date('2024-01-01T01:00:00.000Z').toJSON(),
    );
    expect(subtractMonth(new Date('2024-01-01T02:00:00.000Z')).toJSON()).toBe(
      new Date('2023-12-01T02:00:00.000Z').toJSON(),
    );
    expect(subtractMonth(new Date('2024-03-31T03:00:00.000Z')).toJSON()).toBe(
      new Date('2024-02-29T03:00:00.000Z').toJSON(),
    );
  });

  it('subtractMonth rolling', () => {
    expect(subtractMonth(new Date('2024-01-01T01:00:00.000Z'), { isRolling: true }).toJSON()).toBe(
      new Date('2024-12-01T01:00:00.000Z').toJSON(),
    );
  });

  it('subtractDay', () => {
    expect(subtractDay(new Date('2024-02-02T01:00:00.000Z')).toJSON()).toBe(
      new Date('2024-02-01T01:00:00.000Z').toJSON(),
    );
    expect(subtractDay(new Date('2024-02-01T02:00:00.000Z')).toJSON()).toBe(
      new Date('2024-01-31T02:00:00.000Z').toJSON(),
    );
    expect(subtractDay(new Date('2024-01-01T03:00:00.000Z')).toJSON()).toBe(
      new Date('2023-12-31T03:00:00.000Z').toJSON(),
    );
  });

  it('subtractDay rolling', () => {
    expect(subtractDay(new Date('2024-02-01T01:00:00.000Z'), { isRolling: true }).toJSON()).toBe(
      new Date('2024-02-29T01:00:00.000Z').toJSON(),
    );
  });
});
