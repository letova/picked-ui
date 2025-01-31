import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from '../index';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

const SIZES = ['xs', 's', 'm'] as const;

export const Sizes: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '32px' }}>
        {SIZES.map((size) => (
          <Loader key={size} size={size} />
        ))}
      </div>
    );
  },
};
