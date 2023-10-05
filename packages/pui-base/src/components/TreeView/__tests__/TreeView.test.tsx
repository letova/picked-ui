import { render, screen } from '@testing-library/react';

import { TreeView } from '../TreeView';

describe('TreeView', () => {
  it('displays a "no data" view', () => {
    render(<TreeView />);

    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
