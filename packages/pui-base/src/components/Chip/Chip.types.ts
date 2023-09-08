import { CSSObject } from '@emotion/css';

export interface CustomStyles {
  container: CSSObject;
  action: CSSObject;
}

export interface ChipProps {
  className?: string;
  children?: React.ReactNode;
  slots?: {
    // TODO sep23: add slot - example: { as: 'a'; props: { href: '#as-link' } };
    // action?: { component: React.FC<any>; as: string; props: Record<string, any> };
    startDecorator?: { component: React.FC<any>; props: Record<string, any> };
    endDecorator?: { component: React.FC<any>; props: Record<string, any> };
  };
  cs?: CustomStyles;
  disabled?: boolean;
  onClick?: VoidFunction;
}
