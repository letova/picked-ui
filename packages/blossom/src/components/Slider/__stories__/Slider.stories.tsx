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
        <Slider orientation="vertical" defaultValue={VALUE} />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE_COLUMN_FLEX}>
        <Slider defaultValue={VALUE} />
        <Slider disabled defaultValue={VALUE} />
      </div>
    );
  },
};

export const Colors: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE_COLUMN_FLEX}>
        <Slider color="primary" defaultValue={VALUE} />
        <Slider color="neutral" defaultValue={VALUE} />
        <Slider color="success" defaultValue={VALUE} />
        <Slider color="warning" defaultValue={VALUE} />
        <Slider color="danger" defaultValue={VALUE} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE_COLUMN_FLEX}>
        <Slider defaultValue={VALUE} size="xs" />
        <Slider defaultValue={VALUE} size="s" />
        <Slider defaultValue={VALUE} size="m" />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const containerStyle = { width: '400px' };

    return (
      <div style={containerStyle}>
        <Slider defaultValue={[20, 50]} />
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
          step={10}
          defaultValue={VALUE}
        />
      </div>
    );
  },
}