import type { Meta, StoryObj } from '@storybook/react';

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

export const EndDecorator: Story = {
  args: {
    children: 'Chip',
    slots: { endDecorator: { component: 'button', props: { children: 'x' } } },
  },
};
