import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, CSSObject, cx } from '@emotion/css';

import { getPxSize } from '../../../utils';

import { Switch, SwitchProps } from '../index';

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

const customSizeArgsMap = {
  first: {
    label: 'Material UI',
    thumbSize: 22,
    trackHeight: 14,
    cs: {
      thumb: { backgroundColor: 'darkgray' },
    },
  },
  second: {
    label: 'Strapi',
    thumbSize: 16,
    trackHeight: 24,
    trackWidth: 40,
  },
  third: {
    variant: 'outlined',
    label: "Microsoft's Fluent UI",
    thumbSize: 12,
    trackHeight: 18,
    trackWidth: 38,
  } as const,
};

export const CustomSize: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    const containerStyle = { display: 'flex', gap: '16px' };

    return (
      <div style={containerStyle}>
        <Switch {...customSizeArgsMap.second} />
        <Switch {...customSizeArgsMap.first} />
        <Switch
          {...customSizeArgsMap.third}
          variant={checked ? 'solid' : 'outlined'}
          checked={checked}
          onValueChange={setChecked}
        />
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

/**
 * Story template object prop containing JSX hangs the browser
 * https://github.com/storybookjs/storybook/issues/19575
 * https://github.com/storybookjs/storybook/issues/17720
 * https://github.com/storybookjs/builder-vite/issues/493
 */
const SwitchWithThumbChidren = ({ checked, ...restProps }: SwitchProps) => {
  return (
    <Switch
      {...restProps}
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
            // The problem is here
            children: <span style={{ color: 'gray' }}>{checked ? '0' : 'I'}</span>,
          },
        },
      }}
      checked={checked}
    />
  );
};

export const ThumbChidren: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return <SwitchWithThumbChidren {...args} checked={checked} onValueChange={setChecked} />;
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
    skidding: 7,
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
