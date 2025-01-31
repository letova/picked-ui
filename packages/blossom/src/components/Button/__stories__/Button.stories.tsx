import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Add } from '../../../iconComponents/Add';

import { Button, ButtonProps } from '../index';
import { Switch } from '../../Switch';
import { Spin } from '../../Spin';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Button',
  },
};

export const States: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
      </div>
    );
  },
};

export const WithIcon: Story = {
  args: {
    startDecorator: <Add fill="currentColor" width={18} height={18} />,
    children: 'Button',
  },
};

export const IconButton: Story = {
  args: {
    startDecorator: <Add fill="currentColor" width={20} height={20} />,
  },
};

export const LoadingButton: Story = {
  render: (args) => {
    const [isLoading, setLoading] = useState(false);

    const startDecorator: ButtonProps['startDecorator'] = isLoading ? (
      <Spin size={18} color="#fff" />
    ) : (
      <Add fill="currentColor" width={18} height={18} />
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <Switch label="Toggle loading state" checked={isLoading} onValueChange={setLoading} />
        <Button startDecorator={startDecorator} {...args} />
      </div>
    );
  },
  args: {
    children: 'Button',
  },
};
