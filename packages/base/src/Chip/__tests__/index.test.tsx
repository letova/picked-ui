import { render, screen } from '@testing-library/react';

import { Chip } from '../Chip';

describe('Chip', () => {
  it('should set the disabled class', () => {
    render(<Chip disabled>test</Chip>);

    expect(screen.getByTestId('chip')).toHaveClass('Chip Chip--disabled');
  });

  it('should render "endDecorator" component', () => {
    render(<Chip slots={{ endDecorator: { component: 'button', props: { children: 'slotTest' } } }}>test</Chip>);

    const element = screen.getByText('slotTest');

    expect(element).toBeInTheDocument();
  });
});
