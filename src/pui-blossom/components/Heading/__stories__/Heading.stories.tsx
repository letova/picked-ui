import { css } from '@emotion/css';
import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from '../index';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

const containerClassName = css`
  display: flex;
  flex-direction: column;
`;

const paragraphClassName = css`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.875rem;
`;

export const Base: Story = {
  render: (args: any) => {
    return (
      <div className={containerClassName}>
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <Heading {...args} key={`Heading${v}`} level={v}>
            {`Heading level ${v}`}
          </Heading>
        ))}
        <p className={paragraphClassName}>
          A paragraph (from Ancient Greek παράγραφος (parágraphos) 'to write beside') is a self-contained unit of
          discourse in writing dealing with a particular point or idea. Though not required by the orthographic
          conventions of any language with a writing system, paragraphs are a conventional means of organizing extended
          segments of prose.
        </p>
      </div>
    );
  },
  args: {
    cs: { container: { color: 'red' } },
  },
};
