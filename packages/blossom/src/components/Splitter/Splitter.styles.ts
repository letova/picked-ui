import { SplitterProps } from './Splitter.types';

export const getCS = ({ direction = 'horizontal' }: SplitterProps): SplitterProps['cs'] => {
  return {
    container: {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
    },
  };
};
