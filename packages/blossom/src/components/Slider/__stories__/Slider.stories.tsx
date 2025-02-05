import { CSSProperties } from "react";

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

const VALUE = 20;

export const Horizontal: Story = {
  render: () => {
    const containerStyle = { width: '400px' };

    return (
      <div style={containerStyle}>
        <Slider orientation="horizontal" value={VALUE} />
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
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '400px',
    };

    return (
      <div style={containerStyle}>
        <Slider value={VALUE} />
        <Slider disabled value={VALUE} />
      </div>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '400px',
    };

    return (
      <div style={containerStyle}>
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
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '400px',
    };

    return (
      <div style={containerStyle}>
        <Slider value={VALUE} size="xs" />
        <Slider value={VALUE} size="s" />
        <Slider value={VALUE} size="m" />
      </div>
    );
  },
};