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

const CONTAINER_STYLE = { display: 'flex', gap: '16px' };

export const Base: Story = {
  args: {
    children: 'Button',
  },
};

const SHAPES = ['brick', 'round', 'fully-round'] as const;

export const Shapes: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE}>
        {SHAPES.map((shape) => {
          return <Button shape={shape}>{shape}</Button>;
        })}
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div style={CONTAINER_STYLE}>
        <Button>Enabled</Button>
        <Button pressed>Pressed</Button>
        <Button disabled>Disabled</Button>
      </div>
    );
  },
};

const SIZES = ['xs', 's', 'm'] as const;

export const Sizes: Story = {
  render: () => {
    const containerStyle = { display: 'flex', gap: '32px', alignItems: 'center' };

    return (
      <div style={containerStyle}>
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            {size + ' button'}
          </Button>
        ))}
      </div>
    );
  },
};

const COLORS = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;

export const Variants: Story = {
  render: () => {
    const containerStyle = { ...CONTAINER_STYLE, paddingBottom: '16px' };

    return (
      <>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Button key={color} variant="soft" color={color}>
              {color}
            </Button>
          ))}
          <Button variant="soft" disabled>
            disabled
          </Button>
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Button key={color} color={color}>
              {color}
            </Button>
          ))}
          <Button disabled>disabled</Button>
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Button key={color} variant="outlined" color={color}>
              {color}
            </Button>
          ))}
          <Button variant="outlined" disabled>
            disabled
          </Button>
        </div>
      </>
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
      <div style={{ ...CONTAINER_STYLE, flexDirection: 'column', alignItems: 'center' }}>
        <Switch label="Toggle loading state" checked={isLoading} onValueChange={setLoading} />
        <Button startDecorator={startDecorator} {...args} />
      </div>
    );
  },
  args: {
    children: 'Button',
  },
};
