import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Add } from '../../../iconComponents/Add';

import { Button, ButtonProps } from '../index';

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

const Loader = () => {
  return <div>...</div>;
};

export const LoadingButton: Story = {
  render: (args) => {
    const [isLoading, setLoading] = useState(false);

    const slots: ButtonProps['slots'] = {
      startDecorator: { component: Loader },
    };

    return (
      <>
        <button onClick={() => setLoading(!isLoading)}>Toggle loading state</button>
        <Button slots={isLoading ? slots : undefined} {...args} />
      </>
    );
  },
  args: {
    children: 'button',
  },
};
