import { render, screen } from '@testing-library/react';

import { Paper } from '../Paper';

describe('Paper', () => {
  it('should set the elevation class', () => {
    const { rerender } = render(<Paper elevation={3}>test</Paper>);

    const element = screen.getByText('test');

    expect(element).toHaveClass('Paper Paper--elevation3');

    rerender(<Paper elevation={7}>test</Paper>);

    expect(element).toHaveClass('Paper Paper--elevation7');
  });
});
