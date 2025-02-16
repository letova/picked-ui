import type { Meta, StoryObj } from '@storybook/react';

import { Add } from '../../../iconComponents/Add';

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
        <ButtonGroup.Button>One</ButtonGroup.Button>
        <ButtonGroup.Button>Two</ButtonGroup.Button>
        <ButtonGroup.Button>Free</ButtonGroup.Button>
      </ButtonGroup>
    );
  },
};

export const Outlined: Story = {
  render: () => {
    return (
      <ButtonGroup defaultProps={{ variant: 'outlined' }}>
        <ButtonGroup.Button>One</ButtonGroup.Button>
        <ButtonGroup.Button>Two</ButtonGroup.Button>
        <ButtonGroup.Button>Free</ButtonGroup.Button>
      </ButtonGroup>
    );
  },
};

export const WithNoSpacing: Story = {
  render: () => {
    return (
      <ButtonGroup defaultProps={{ variant: 'outlined' }} spacing={0}>
        <ButtonGroup.Button>One</ButtonGroup.Button>
        <ButtonGroup.Button>Two</ButtonGroup.Button>
        <ButtonGroup.Button>Free</ButtonGroup.Button>
      </ButtonGroup>
    );
  },
};

export const WithIconButton: Story = {
  render: () => {
    return (
      <ButtonGroup defaultProps={{ variant: 'outlined' }} spacing={0}>
        <ButtonGroup.Button>Text</ButtonGroup.Button>
        <ButtonGroup.Button startDecorator={<Add fill="currentColor" width={20} height={20} />} />
      </ButtonGroup>
    );
  },
};
