type OmitedButtonHTMLAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'ref'>;

export interface ButtonProps extends OmitedButtonHTMLAttributes {
  children?: React.ReactNode;
  startDecorator?: React.ReactElement | string | number;
  endDecorator?: React.ReactElement | string | number;
  slots?: {
    startDecorator?: { component: React.ElementType<any>; props?: Record<string, unknown> };
    endDecorator?: { component: React.ElementType<any>; props?: Record<string, unknown> };
  };
  highlighted?: boolean;
}
