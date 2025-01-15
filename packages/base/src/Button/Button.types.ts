import { Slot } from '../types';

type OmitedButtonHTMLAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'ref'>;

export interface ButtonProps extends OmitedButtonHTMLAttributes {
  children?: React.ReactNode;
  startDecorator?: React.ReactElement | string | number;
  endDecorator?: React.ReactElement | string | number;
  slots?: {
    startDecorator?: Slot;
    endDecorator?: Slot;
  };
  highlighted?: boolean;
}
