type OmitedButtonHTMLAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'ref'>;

export interface ButtonProps extends OmitedButtonHTMLAttributes {
  children?: React.ReactNode;
  slots?: {
    startDecorator?: { component: React.ElementType<any>; props?: Record<string, unknown> };
    endDecorator?: { component: React.ElementType<any>; props?: Record<string, unknown> };
  };
}
