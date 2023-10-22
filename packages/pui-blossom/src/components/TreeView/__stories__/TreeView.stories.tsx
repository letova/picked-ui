import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TreeView, TreeViewProps } from '../index';

import { DATA } from '../../../../../pui-base/src/components/TreeView/__testMocks__';

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

const baseRender = (args: any) => {
  const [expanded, setExpanded] = useState<string | string[]>(['1', '2']);
  const [selected, setSelected] = useState(['1-1']);

  const handleNodeExpandChange: TreeViewProps['onNodeExpandChange'] = ({ expandedIds }) => {
    setExpanded(expandedIds);
  };

  const handleNodeSelectChange: TreeViewProps['onNodeSelectChange'] = ({ selectedIds }) => {
    setSelected(selectedIds);
  };

  return (
    <TreeView
      {...args}
      data={DATA}
      expanded={expanded}
      selected={selected}
      onNodeExpandChange={handleNodeExpandChange}
      onNodeSelectChange={handleNodeSelectChange}
    />
  );
};

export const Base: Story = {
  render: baseRender,
};

export const Disabled: Story = {
  render: baseRender,
  args: {
    disabled: ['1-3-2'],
  },
};
