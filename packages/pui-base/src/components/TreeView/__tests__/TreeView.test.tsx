import { fireEvent, render, screen } from '@testing-library/react';

import { TreeView } from '../TreeView';

import { DATA } from '../__testMocks__';
import { TreeViewProps } from '../TreeView.types';

describe('TreeView', () => {
  it('displays a "no data" view', () => {
    render(<TreeView />);

    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  describe('correctly calls the "onNodeSelectChange"', () => {
    const mockFn = jest.fn();

    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-lifecycle
      render(<TreeView data={DATA} expanded="all" onNodeSelectChange={mockFn} />);
    });

    it('when root parent is selected', () => {
      fireEvent.click(screen.getByText('Label 1'));

      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedIds: ['1', '1-1', '1-2', '1-3', '1-3-1', '1-3-2', '1-3-2-1', '1-3-2-2', '1-3-3'],
        }),
        expect.any(Object),
      );
    });

    it('when parent is selected', () => {
      fireEvent.click(screen.getByText('Label 1-3-2'));

      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedIds: ['1-3-2', '1-3-2-1', '1-3-2-2'],
        }),
        expect.any(Object),
      );
    });

    it('when leaf is selected', () => {
      fireEvent.click(screen.getByText('Label 1-3-2-1'));

      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedIds: ['1-3-2-1'],
        }),
        expect.any(Object),
      );
    });
  });

  it('correctly calls the "onNodeSelectChange" when all leafs is selected', () => {
    const mockFn = jest.fn();

    const handleNodeSelectChange: TreeViewProps['onNodeSelectChange'] = (options) => {
      mockFn(options.selectedIds.sort());
    };

    render(<TreeView data={DATA} expanded="all" selected={'2-1-1-1'} onNodeSelectChange={handleNodeSelectChange} />);

    fireEvent.click(screen.getByText('Label 2-1-1-2'));

    expect(mockFn).toHaveBeenCalledWith(['2', '2-1', '2-1-1', '2-1-1-1', '2-1-1-2'].sort());
  });

  it('correctly calls the "onNodeSelectChange" when select parent that has disabled nodes', () => {
    const mockFn = jest.fn();

    const handleNodeSelectChange: TreeViewProps['onNodeSelectChange'] = (options) => {
      mockFn(options.selectedIds.sort());
    };

    render(<TreeView data={DATA} expanded="all" disabled={'1-3-2'} onNodeSelectChange={handleNodeSelectChange} />);

    fireEvent.click(screen.getByText('Label 1-3'));

    expect(mockFn).toHaveBeenCalledWith(['1-3-1', '1-3-3']);
  });

  it('correctly calls the "onNodeSelectChange" when select parent that has no enabled to select nodes', () => {
    const mockFn = jest.fn();

    const handleNodeSelectChange: TreeViewProps['onNodeSelectChange'] = (options) => {
      mockFn(options.selectedIds.sort());
    };

    render(
      <TreeView
        data={DATA}
        expanded="all"
        selected={['1-3-1', '1-3-3']}
        disabled={'1-3-2'}
        onNodeSelectChange={handleNodeSelectChange}
      />,
    );

    fireEvent.click(screen.getByText('Label 1-3'));

    expect(mockFn).toHaveBeenCalledWith([]);
  });

  it('correctly calls the "onNodeSelectChange" when select root parent that has disabled nodes', () => {
    const mockFn = jest.fn();

    const handleNodeSelectChange: TreeViewProps['onNodeSelectChange'] = (options) => {
      mockFn(options.selectedIds.sort());
    };

    render(
      <TreeView
        data={DATA}
        expanded="all"
        selected={['1-1', '1-2', '1-3-1', '1-3-3']}
        disabled={'1-3-2'}
        onNodeSelectChange={handleNodeSelectChange}
      />,
    );

    fireEvent.click(screen.getByText('Label 1'));

    expect(mockFn).toHaveBeenCalledWith([]);
  });

  it('correctly calls the "onNodeSelectChange" when select root parent that has disabled nodes and unselected nodes', () => {
    const mockFn = jest.fn();

    const handleNodeSelectChange: TreeViewProps['onNodeSelectChange'] = (options) => {
      mockFn(options.selectedIds.sort());
    };

    render(
      <TreeView
        data={DATA}
        expanded="all"
        selected={['1-1', '1-3-1', '1-3-3']}
        disabled={'1-3-2'}
        onNodeSelectChange={handleNodeSelectChange}
      />,
    );

    fireEvent.click(screen.getByText('Label 1'));

    expect(mockFn).toHaveBeenCalledWith(['1-1', '1-2', '1-3-1', '1-3-3']);
  });
});
