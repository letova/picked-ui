import type { Meta, StoryObj } from '@storybook/react';

import { Paper } from '../../Paper';

import { Splitter } from '../index';

const meta = {
  title: 'Components/Splitter',
  component: Splitter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    return (
      <Splitter>
        <div>
          <Paper>First</Paper>
        </div>
        <div>
          <Paper>Second</Paper>
        </div>
      </Splitter>
    );
  },
};
