import type { Meta, StoryObj } from '@storybook/react';

import { getPxSize } from '../../../utils';

import { Spin } from '../index';

const meta = {
  title: 'Components/Spin',
  component: Spin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

const SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;

export const Sizes: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: getPxSize(32) }}>
        {SIZES.map((size) => (
          <Spin key={size} size={size} />
        ))}
      </div>
    );
  },
};
