import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Chip } from '../Chip';

describe('Blossom Chip', () => {
  it('should set custom class', () => {
    render(<Chip className="testClass">test</Chip>);

    expect(Array.from(screen.getByTestId('chip').classList).includes('testClass')).toBe(true);
  });
});
