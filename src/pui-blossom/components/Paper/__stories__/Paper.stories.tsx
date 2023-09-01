import { css } from '@emotion/css';
import type { Meta, StoryObj } from '@storybook/react';

import { Paper } from '../index';

const meta = {
  title: 'Components/Paper',
  component: Paper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

const containerClassName = css`
  display: grid;
  grid-template-columns: 180px 180px 180px 180px;
  gap: 16px;
`;

export const Base: Story = {
  render: (args) => {
    return (
      <div className={containerClassName}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
          <Paper {...args} elevation={v}>
            {`Elevation ${v}`}
          </Paper>
        ))}
      </div>
    );
  },
  args: {
    customStyles: {
      container: {
        padding: '10px',
        background: 'antiquewhite',
      },
    },
  },
};
