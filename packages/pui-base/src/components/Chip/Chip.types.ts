import { CSSObject } from '@emotion/css';

export interface CustomStyles {
  container: CSSObject;
}

export interface ChipProps {
  className?: string;
  children?: React.ReactNode;
  elements?: {
    startDecoratorContent?: React.ReactNode;
    endDecoratorContent?: React.ReactNode;
  };
  slots?: {
    // actionElement?: { component: 'a'; props: { href: '#as-link' } };
    action?: { component: string | React.FC<any>; props: { href: Record<string, any> };
    startDecorator?: { component: string | React.FC<any>; props: Record<string, any> };
    endDecorator?: { component: string | React.FC<any>; props: Record<string, any> };
  };
  cs?: CustomStyles;
  disabled?: boolean;
  onClick?: VoidFunction; // args???
  // aria-labelledby on btn ???
  // aria-label
  // tabIndex

  /* blossom */
  // variant="outlined"
  // size="lg"
}
