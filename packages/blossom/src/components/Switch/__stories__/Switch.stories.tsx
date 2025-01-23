import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '../index';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

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
        <Switch label="Unchecked" />
        <Switch label="Checked" defaultChecked />
        <Switch label="Disabled" disabled />
        <Switch label="Disabled checked" disabled defaultChecked />
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
            <Switch key={color} variant="soft" color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Switch key={color} color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Switch key={color} variant="outlined" color={color} label={color} defaultChecked />
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
          <Switch key={size} size={size} label="Label" defaultChecked />
        ))}
      </div>
    );
  },
};

const TrackContent = () => {
  return (
    <>
      <span style={{ fontSize: '12px', marginLeft: '4px', color: 'white' }}>On</span>
      <span style={{ fontSize: '12px', marginRight: '6px', color: 'white' }}>Off</span>
    </>
  );
};

export const TrackChild: Story = {
  args: {
    slots: {
      trackContent: { component: TrackContent },
    },
    size: 'm',
    trackWidth: 46,
  },
};
