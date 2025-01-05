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

const COLORS = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;

export const Colors: Story = {
  render: () => {
    const containerStyle = { display: 'flex', gap: '16px', paddingBottom: '16px' };

    return (
      <>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Checkbox key={color} variant="soft" color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Checkbox key={color} color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Checkbox key={color} variant="outlined" color={color} label={color} defaultChecked />
          ))}
        </div>
      </>
    );
  },
};
