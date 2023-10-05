import type { Meta, StoryObj } from '@storybook/react';

import { TreeView } from '../index';

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

export const Base: Story = {
  args: {
    data: [
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
              { id: '1-3-2', label: 'Label 1-3-2' },
              { id: '1-3-3', label: 'Label 1-3-3' },
            ],
          },
        ],
      },
      {
        id: '2',
        label: 'Label 2',
        children: [
          { id: '2-1', label: 'Label 2-1' },
          { id: '2-2', label: 'Label 2-2' },
        ],
      },
      { id: '3', label: 'Label 3' },
    ],
  },
};

export const SomeExpanded: Story = {
  args: {
    expanded: ['1', '1-1', '1-2'],
    data: [
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
              { id: '1-3-2', label: 'Label 1-3-2' },
              { id: '1-3-3', label: 'Label 1-3-3' },
            ],
          },
        ],
      },
      {
        id: '2',
        label: 'Label 2',
        children: [
          { id: '2-1', label: 'Label 2-1' },
          { id: '2-2', label: 'Label 2-2' },
        ],
      },
      { id: '3', label: 'Label 3' },
    ],
  },
};
