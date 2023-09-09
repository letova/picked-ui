import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '../index';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Chip',
    slots: { endDecorator: { component: 'button', props: { children: 'x' } } },
  },
};
