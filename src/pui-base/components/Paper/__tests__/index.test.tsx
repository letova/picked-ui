import { render, screen } from '@testing-library/react';

import { Paper } from '../Paper';

describe('Paper', () => {
  it('should set the elevation class', () => {
    render(<Paper elevation={2}>test</Paper>);

    const element = screen.getByText('test');

    expect(element).toHaveClass('Paper Paper--elevation2');
  });
});
