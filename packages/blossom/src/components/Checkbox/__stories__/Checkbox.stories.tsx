import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../index';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: 'Label',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Label',
    indeterminate: true,
  },
};

export const Colors: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        {['primary', 'secondary', 'success', 'warning', 'danger'].map((color) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Checkbox key={color} color={color as any} label={color} defaultChecked />
        ))}
      </div>
    );
  },
};
