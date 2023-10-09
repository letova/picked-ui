import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TreeView, TreeViewProps } from '../index';

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

const DATA = [
  {
    id: '1',
    label: 'Label 1',
    children: [
      { id: '1-1', label: 'Label 1-1' },
      { id: '1-2', label: 'Label 1-2' },
      {
        id: '1-3',
        label: 'Label 1-3',
        children: [
          { id: '1-3-1', label: 'Label 1-3-1' },
          {
            id: '1-3-2',
            label: 'Label 1-3-2',
            children: [
              { id: '1-3-2-1', label: 'Label 1-3-2-1' },
              { id: '1-3-2-2', label: 'Label 1-3-2-2' },
            ],
          },
          { id: '1-3-3', label: 'Label 1-3-3' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Label 2',
    children: [
      {
        id: '2-1',
        label: 'Label 2-1',
        children: [
          {
            id: '2-1-1',
            label: 'Label 2-1-1',
            children: [
              { id: '2-1-1-1', label: 'Label 2-1-1-1' },
              { id: '2-1-1-2', label: 'Label 2-1-1-2' },
            ],
          },
        ],
      },
    ],
  },
  { id: '3', label: 'Label 3' },
];

export const Base: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string | string[]>(['1', '2']);
    const [selected, setSelected] = useState(['1-1']);

    const handleNodeExpandChange: TreeViewProps['onNodeExpandChange'] = ({ expandedIds }) => {
      setExpanded(expandedIds);
    };

    const handleNodeSelectChange: TreeViewProps['onNodeSelectChange'] = ({ node, isSelected }) => {
      const nextState = isSelected ? [...selected, node.id] : selected.filter((id) => id !== node.id);
      setSelected(nextState);
    };

    return (
      <TreeView
        data={DATA}
        expanded={expanded}
        selected={selected}
        onNodeExpandChange={handleNodeExpandChange}
        onNodeSelectChange={handleNodeSelectChange}
      />
    );
  },
};

export const SomeExpanded: Story = {
  args: {
    expanded: ['1', '1-1', '1-2'],
    data: DATA,
  },
};
