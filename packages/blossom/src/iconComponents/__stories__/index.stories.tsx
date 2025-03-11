import type { Meta, StoryObj } from '@storybook/react';

import { Add, Check, Remove } from '../index';

const IconList = ({ size }: { size: number }) => {
  return (
    <div>
      {[Add, Check, Remove].map((Component, idx) => {
        return <Component key={idx} width={size} height={size} />;
      })}
    </div>
  );
};

const meta = {
  title: 'IconComponents/List',
  component: IconList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    size: 16,
  },
};
