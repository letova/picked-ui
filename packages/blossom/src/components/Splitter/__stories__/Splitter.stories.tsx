import type { Meta, StoryObj } from '@storybook/react';

import { Paper } from '../../Paper';

import { Splitter } from '../index';

const meta = {
  title: 'Components/Splitter',
  component: Splitter,
  tags: ['autodocs'],
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

const paperCS = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    background: 'white',
  },
};

export const Base: Story = {
  render: () => {
    return (
      <Splitter>
        <div>
          <Paper elevation={2} cs={paperCS}>
            First
          </Paper>
        </div>
        <div>
          <Paper elevation={2} cs={paperCS}>
            Second
          </Paper>
        </div>
      </Splitter>
    );
  },
};
