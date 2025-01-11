import { CSSObject } from '@emotion/css';

import { Slot } from '../types';

export interface ChipCS {
  container?: CSSObject;
  action?: CSSObject;
  label?: CSSObject;
}

export interface ChipProps {
  className?: string;
  children?: React.ReactNode;
  slots?: {
    // TODO sep23: add slot - example: { as: 'a'; props: { href: '#as-link' } };
    // action?: { ... };
    startDecorator?: Slot;
    endDecorator?: Slot;
  };
  cs?: ChipCS;
  disabled?: boolean;
  onClick?: VoidFunction;
}
