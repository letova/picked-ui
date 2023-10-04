import { render, screen } from '@testing-library/react';

import { TreeView } from '../TreeView';

describe('Checkbox', () => {
  it('renders no data', () => {
    render(<TreeView />);

    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
