import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, CSSObject, cx } from '@emotion/css';

import { getPxSize } from '../../../utils';

import { Switch } from '../index';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: 'Label',
  },
};

export const States: Story = {
  render: () => {
    const containerStyle = { display: 'flex', gap: '16px' };

    return (
      <div style={containerStyle}>
        <Switch label="Unchecked" />
        <Switch label="Checked" defaultChecked />
        <Switch label="Disabled" disabled />
        <Switch label="Disabled checked" disabled defaultChecked />
      </div>
    );
  },
  args: {
    label: 'Label',
  },
};

const COLORS = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;

export const Colors: Story = {
  render: () => {
    const containerStyle = { display: 'flex', gap: '16px', paddingBottom: '16px' };

    return (
      <>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Switch key={color} variant="soft" color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Switch key={color} color={color} label={color} defaultChecked />
          ))}
        </div>
        <div style={containerStyle}>
          {COLORS.map((color) => (
            <Switch key={color} variant="outlined" color={color} label={color} defaultChecked />
          ))}
        </div>
      </>
    );
  },
};

const SIZES = ['xs', 's', 'm'] as const;

export const Sizes: Story = {
  render: () => {
    const containerStyle = { display: 'flex', gap: '32px' };

    return (
      <div style={containerStyle}>
        {SIZES.map((size) => (
          <Switch key={size} size={size} label="Label" defaultChecked />
        ))}
      </div>
    );
  },
};

const TrackContentFC = () => {
  return (
    <>
      <span style={{ fontSize: '12px', marginLeft: '4px', color: 'white' }}>On</span>
      <span style={{ fontSize: '12px', marginRight: '6px', color: 'white' }}>Off</span>
    </>
  );
};

export const TrackContent: Story = {
  args: {
    slots: {
      trackContent: { component: TrackContentFC },
    },
    size: 'm',
    trackWidth: 46,
  },
};

export const ThumbChidren: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Switch
        {...args}
        cs={{
          thumb: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
        slots={{
          thumb: {
            props: {
              children: <span>{checked ? 'O' : 'I'}</span>,
            },
          },
        }}
        checked={checked}
        // onChange={setChecked}
        onValueChange={setChecked}
      />
    );
  },
  args: {
    size: 'm',
  },
};

const outerThumbStyle: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'transparent',
};

const innerThumbStyle: CSSObject = {
  display: 'inline-block',
  width: getPxSize(20),
  height: getPxSize(20),
  background: '#fff',
  borderRadius: '50%',
};

export const RippleEffect: Story = {
  args: {
    size: 'm',
    thumbSize: 38,
    cs: {
      container: {
        '&:hover .Switch-thumb': {
          background: 'rgb(0, 0, 0, 0.1)',
        },
        '&:active .Switch-thumb': {
          background: 'rgb(0, 0, 0, 0.15)',
        },
      },
    },
    slots: {
      thumb: {
        component: ({ className }: { className: string }) => {
          return (
            <span className={cx(className, css(outerThumbStyle))}>
              <span className={css(innerThumbStyle)}></span>
            </span>
          );
        },
      },
    },
  },
};
