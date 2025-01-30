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
        <Slider orientation="horizontal" />
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const containerStyle = { height: '400px' };

    return (
      <div style={containerStyle}>
        <Slider orientation="vertical" />
      </div>
    );
  },
};