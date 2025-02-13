import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroup } from '../index';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    return (
      <ButtonGroup>
        <ButtonGroup.Button>1</ButtonGroup.Button>
        <ButtonGroup.Button>2</ButtonGroup.Button>
      </ButtonGroup>
    );
  },
};
