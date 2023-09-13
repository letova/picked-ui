import { CSSObject } from '@emotion/css';

export interface CustomStyles {
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
    startDecorator?: { component: React.ElementType<any>; props: Record<string, unknown> };
    endDecorator?: { component: React.ElementType<any>; props: Record<string, unknown> };
  };
  cs?: CustomStyles;
  disabled?: boolean;
  onClick?: VoidFunction;
}
