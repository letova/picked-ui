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

export const Horizontal: Story = {
  render: () => {
    const containerStyle = { width: '400px' };

    return (
      <div style={containerStyle}>
        <Slider orientation="horizontal" value={20} />
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const containerStyle = { height: '200px' };

    return (
      <div style={containerStyle}>
        <Slider orientation="vertical" value={20} />
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
        <Slider orientation="horizontal" value={20} />
        <Slider orientation="horizontal" disabled value={20} />
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
        <Slider orientation="horizontal" color="primary" value={20} />
        <Slider orientation="horizontal" color="neutral" value={20} />
        <Slider orientation="horizontal" color="success" value={20} />
        <Slider orientation="horizontal" color="warning" value={20} />
        <Slider orientation="horizontal" color="danger" value={20} />
      </div>
    );
  },
};