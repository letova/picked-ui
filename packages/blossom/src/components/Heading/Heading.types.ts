import { HeadingProps as BaseHeadingProps } from '@picked-ui/base';

export interface HeadingProps extends BaseHeadingProps {
  size?: 'xs' | 's' | 'm';
  scale?: number;
}
