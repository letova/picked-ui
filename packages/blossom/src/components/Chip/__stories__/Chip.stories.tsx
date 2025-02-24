import type { Meta, StoryObj } from '@storybook/react';

import { getPxSize } from '../../../utils';

import { Button, ButtonProps } from '../../Button';

import { Chip } from '../index';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {['primary', 'neutral', 'success', 'warning', 'danger'].map((color) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Chip key={color} color={color as any} onClick={() => console.log('Click ', color)}>
            {color}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Outlined: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {['primary', 'neutral', 'success', 'warning', 'danger'].map((color) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Chip key={color} variant="outlined" color={color as any} onClick={() => console.log('Click ', color)}>
            {color}
          </Chip>
        ))}
      </div>
    );
  },
};

export const MaxWidth: Story = {
  args: {
    children: 'How to build a component library with React and TypeScript',
    maxWidth: 150,
  },
};

const buttonProps = {
  variant: 'solid',
  children: 'x',
  cs: {
    container: {
      minHeight: 'auto',
      padding: `0 ${getPxSize(4)}`,
    },
  },
} satisfies ButtonProps;

export const EndDecorator: Story = {
  args: {
    children: 'Chip',
    slots: {
      endDecorator: { component: Button, props: buttonProps },
    },
  },
};
