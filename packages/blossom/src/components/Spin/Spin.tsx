import { css, cx } from '@emotion/css';
import { getCS } from './Spin.styles';
import { SpinProps } from './Spin.types';

export const Spin = (props: SpinProps) => {
  const { className } = props;
  const cs = getCS(props);

  return (
    <span className={cx('Spin', className, css(cs?.container))}>
      <span className={cx('Spin-progress', css(cs?.progress))}></span>
    </span>
  );
};
