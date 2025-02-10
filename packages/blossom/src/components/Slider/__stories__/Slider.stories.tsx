import { CSSProperties, useState } from "react";

import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from '../index';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const CONTAINER_STYLE_COLUMN_FLEX: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '400px',
}

const VALUE = 20;

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState<number | number[]>(VALUE);
    const containerStyle = { width: '400px' };

    return (
      <div style={containerStyle}>
        <Slider orientation="horizontal" value={value} onValueChange={setValue} />
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const containerStyle = { height: '200px' };

    return (
      <div style={containerStyle}>
        <Slider orientation="vertical" value={VALUE} />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE_COLUMN_FLEX}>
        <Slider value={VALUE} />
        <Slider disabled value={VALUE} />
      </div>
    );
  },
};

export const Colors: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE_COLUMN_FLEX}>
        <Slider color="primary" value={VALUE} />
        <Slider color="neutral" value={VALUE} />
        <Slider color="success" value={VALUE} />
        <Slider color="warning" value={VALUE} />
        <Slider color="danger" value={VALUE} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE_COLUMN_FLEX}>
        <Slider value={VALUE} size="xs" />
        <Slider value={VALUE} size="s" />
        <Slider value={VALUE} size="m" />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const containerStyle = { width: '400px' };

    return (
      <div style={containerStyle}>
        <Slider value={[20, 50]} />
      </div>
    );
  },
};

export const WithMarks = {
  render: () => {
    const containerStyle = { width: '400px' };

    return (
      <div style={containerStyle}>
        <Slider
          marks={true}
          step={20}
          value={VALUE}
        />
      </div>
    );
  },
}