import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders an input with the name', () => {
    render(<Checkbox name="bar" />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'bar');
  });

  it('renders an input with the checked state', () => {
    render(<Checkbox checked />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders an input with the default checked state and change it', () => {
    render(<Checkbox defaultChecked />);

    const input = screen.getByRole('checkbox');

    expect(input).toBeChecked();

    fireEvent.click(input);

    expect(input).not.toBeChecked();
  });

  it('shows label', () => {
    render(<Checkbox label="test label" />);

    const label = screen.getByText('test label');

    expect(label).toBeInTheDocument();

    fireEvent.click(label);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('the input can be disabled', () => {
    render(<Checkbox disabled />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('sets focus to the input', () => {
    render(<Checkbox label="test label" autoFocus />);

    const input = screen.getByRole('checkbox');

    expect(input).toHaveFocus();
  });
});
