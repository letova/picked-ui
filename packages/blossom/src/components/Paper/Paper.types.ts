import { PaperProps as BasePaperProps } from '@picked-ui/base';

export interface PaperProps extends BasePaperProps {
  scale?: number;
  square?: boolean;
  outline?: boolean;
}
