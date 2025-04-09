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

export const States: Story = {
  render: () => {
    const containerStyle = { display: 'flex', gap: '16px' };

    return (
      <div style={containerStyle}>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Read only state" readOnlyState />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
        <Checkbox label="Disabled indeterminate" disabled indeterminate />
      </div>
    );
  },
  args: {
    label: 'Label',
  },
};

const COLORS = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;

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

const SIZES = ['xs', 's', 'm'] as const;

export const Sizes: Story = {
  render: () => {
    const containerStyle = { display: 'flex', gap: '32px' };

    return (
      <div style={containerStyle}>
        {SIZES.map((size) => (
          <Checkbox key={size} size={size} label="Label" defaultChecked />
        ))}
      </div>
    );
  },
};
