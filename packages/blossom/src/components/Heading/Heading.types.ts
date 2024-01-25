import { HeadingProps as BaseHeadingProps } from '../../../../base/src/components/Heading';

export interface HeadingProps extends BaseHeadingProps {
  size?: 'xs' | 's' | 'm';
  scale?: number;
}
