import { ChipProps as BaseChipProps } from '@picked-ui/base';

// import { HexColor } from '../../types';

export interface ChipProps extends BaseChipProps {
  scale?: number;
  variant?: 'soft' | 'solid' | 'outlined';
  size?: 'xs' | 's' | 'm';
  maxWidth?: number;
  // TODO sep23: add HexColor
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  highlighted?: boolean;
}
