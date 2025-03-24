import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { Checkbox } from '../../Checkbox';

import { TreeView, TreeViewProps } from '../index';

import { TreeViewApi } from '../TreeView';

import { DATA } from '../__testMocks__';

const meta = {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TreeView>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseRender: Story['render'] = (args: TreeViewProps) => {
  const [expanded, setExpanded] = useState<string | string[] | undefined>('all');
  const [selected, setSelected] = useState<string | undefined>('1-1');

  const handleExpandedIdsChange: TreeViewProps['onExpandedIdsChange'] = ({ expandedIds }) => {
    setExpanded(expandedIds);
  };

  const handleSelectedIdsChange: TreeViewProps['onSelectedIdsChange'] = ({ selectedIds }) => {
    setSelected(selectedIds as string);
  };

  return (
    <TreeView
      {...args}
      data={DATA}
      expandedIds={expanded}
      selectedIds={selected}
      onExpandedIdsChange={handleExpandedIdsChange}
      onSelectedIdsChange={handleSelectedIdsChange}
    />
  );
};

export const Base: Story = {
  render: baseRender,
};

export const Disabled: Story = {
  render: baseRender,
  args: {
    disabledIds: ['1-3-2'],
  },
};

export const Search: Story = {
  render: baseRender,
  args: {
    search: {
      match: (node) => {
        return { result: node.label.includes('1-3') };
      },
    },
  },
};

/* MODE MULTI-SELECT */

const useMultiTreeViewState = () => {
  const [expanded, setExpanded] = useState<string | string[] | undefined>('all');
  const [selected, setSelected] = useState<string | string[] | undefined>(['1-1']);

  const handleExpandedIdsChange: TreeViewProps['onExpandedIdsChange'] = ({ expandedIds }) => {
    setExpanded(expandedIds);
  };

  const handleSelectedIdsChange: TreeViewProps['onSelectedIdsChange'] = ({ selectedIds }) => {
    setSelected(selectedIds as string);
  };

  return {
    expanded,
    selected,
    onExpandedIdsChange: handleExpandedIdsChange,
    onSelectedIdsChange: handleSelectedIdsChange,
  };
};

const multiRender: Story['render'] = (args: TreeViewProps) => {
  const state = useMultiTreeViewState();

  return (
    <TreeView
      {...args}
      data={DATA}
      expandedIds={state.expanded}
      selectedIds={state.selected}
      onExpandedIdsChange={state.onExpandedIdsChange}
      onSelectedIdsChange={state.onSelectedIdsChange}
    />
  );
};

export const Multi: Story = {
  render: multiRender,
  args: {
    mode: 'multi-select',
  },
};

const multiRenderWithApi: Story['render'] = (args: TreeViewProps) => {
  const state = useMultiTreeViewState();
  const apiRef = useRef<TreeViewApi>(null);

  useEffect(() => {
    console.log('Metadata for node 1-1', apiRef.current!.getStateById('1-1'));
  }, []);

  return (
    <TreeView
      {...args}
      apiRef={apiRef}
      data={DATA}
      expandedIds={state.expanded}
      selectedIds={state.selected}
      onExpandedIdsChange={state.onExpandedIdsChange}
      onSelectedIdsChange={state.onSelectedIdsChange}
    />
  );
};

export const MultiApi: Story = {
  render: multiRenderWithApi,
  args: {
    mode: 'multi-select',
  },
};

export const MultiDisabled: Story = {
  render: multiRender,
  args: {
    mode: 'multi-select',
    disabledIds: ['1-3-2'],
  },
};

const CHECKBOX_CS = {
  container: {
    marginRight: '4px',
  },
};

export const MultiWithCheckbox: Story = {
  render: multiRender,
  args: {
    mode: 'multi-select',
    disabledIds: ['1-3-2'],
    slots: {
      labelStartDecorator: {
        component: ({
          state,
        }: {
          state: {
            selected: boolean;
            indeterminate: boolean;
            disabled: boolean;
          };
        }) => {
          return (
            <Checkbox
              variant="soft"
              checked={state.selected}
              indeterminate={state.indeterminate}
              disabled={state.disabled}
              cs={CHECKBOX_CS}
            />
          );
        },
      },
    },
  },
};

export const MultiSearch: Story = {
  render: multiRender,
  args: {
    mode: 'multi-select',
    search: {
      match: (node) => {
        return { result: node.label.includes('1-3') };
      },
    },
  },
};
