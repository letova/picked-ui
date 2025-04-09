import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '../index';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    return <Pagination page={1} pageCount={10} />;
  },
};
