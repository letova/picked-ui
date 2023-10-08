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
    const [expanded, setExpanded] = useState(['1', '2']);

    const handleNodeExpandChange: TreeViewProps['onNodeExpandChange'] = ({ node, isExpanded }) => {
      const nextState = isExpanded ? [...expanded, node.id] : expanded.filter((id) => id !== node.id);
      setExpanded(nextState);
    };

    return <TreeView data={DATA} expanded={expanded} onNodeExpandChange={handleNodeExpandChange} />;
  },
};

export const SomeExpanded: Story = {
  args: {
    expanded: ['1', '1-1', '1-2'],
    data: DATA,
  },
};
