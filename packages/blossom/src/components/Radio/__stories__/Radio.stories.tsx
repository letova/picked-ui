import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from '../index';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

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
        <Radio label="Unchecked" />
        <Radio label="Checked" defaultChecked />
        <Radio label="Disabled" disabled />
        <Radio label="Disabled checked" disabled defaultChecked />
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
            <Radio key={color} variant="soft" color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Radio key={color} color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Radio key={color} variant="outlined" color={color} label={color} defaultChecked />
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
          <Radio key={size} size={size} label="Label" defaultChecked />
        ))}
      </div>
    );
  },
};
