import { render, screen } from '@testing-library/react';

import { Heading } from '../Heading';

describe('Heading', () => {
  it('should set the level class', () => {
    const { rerender } = render(<Heading level={3}>test</Heading>);

    const element = screen.getByText('test');

    expect(element).toHaveClass('Heading Heading--level3');

    rerender(<Heading level={5}>test</Heading>);

    /**
     * React.createElement('h1', props) behavior is not equivalent to <h1 {...props}>
     */
    const rerenderedElement = screen.getByText('test');

    expect(rerenderedElement).toHaveClass('Heading Heading--level5');
  });

  it('should render a div with role and aria attributes', () => {
    render(
      <Heading level={3} as="div">
        test
      </Heading>,
    );

    const element = screen.getByText('test');

    expect(element.tagName).toBe('DIV');
    expect(element).toHaveAttribute('role', 'heading');
    expect(element).toHaveAttribute('aria-level', '3');
  });
});
