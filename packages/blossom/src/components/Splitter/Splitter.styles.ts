import { Colors } from '../../constants';
import { getPxSize } from '../../utils';
import { SplitterProps } from './Splitter.types';

export const getCS = ({ direction = 'horizontal' }: SplitterProps): SplitterProps['cs'] => {
  return {
    container: {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      background: Colors.Neutral200,
    },
    section: {
      flexGrow: 1,
    },
    separator: {
      flexGrow: 0,
      flexShrink: 0,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: getPxSize(8),
    },
  };
};
