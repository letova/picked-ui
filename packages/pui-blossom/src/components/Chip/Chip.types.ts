import { ChipProps as BaseChipProps } from '../../../../pui-base/src/components/Chip';

// import { HexColor } from '../../types';

export interface ChipProps extends BaseChipProps {
  scale?: number;
  variant?: 'plain' | 'outlined' | 'dashed';
  size?: 'xs' | 's' | 'm';
  maxWidth?: number;
  // TODO sep23: add HexColor
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  highlighted?: boolean;
}
