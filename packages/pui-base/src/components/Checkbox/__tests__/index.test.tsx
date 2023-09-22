import { render, screen } from '@testing-library/react';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('shows label', () => {
    render(<Checkbox label="test label" checked />);

    const element = screen.queryByText('test label');

    expect(element).toBeInTheDocument();
  });

  it('sets focus to the input', () => {
    render(<Checkbox label="test label" autoFocus />);

    const input = screen.getByRole('checkbox');

    expect(document.activeElement).toBe(input);
    expect(input).toHaveFocus();
  });
});
