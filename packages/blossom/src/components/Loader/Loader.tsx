import { css, cx } from '@emotion/css';
import { getCS } from './Loader.styles';
import { LoaderProps } from './Loader.types';

export const Loader = (props: LoaderProps) => {
  const { className } = props;
  const cs = getCS(props);

  return (
    <span className={cx('Loader', className, css(cs?.container))}>
      <span className={cx('Loader-progress', css(cs?.progress))}></span>
    </span>
  );
};
