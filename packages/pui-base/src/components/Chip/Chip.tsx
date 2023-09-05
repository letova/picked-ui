import { css, cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { ChipProps } from './Chip.types';

const Chip = forwardRef(
  ({ className, children, elements = {}, cs, disabled, onClick }: ChipProps, ref: ForwardedRef<HTMLDivElement>) => {
    const clickable = !!onClick;
    const id = String(new Date().getMilliseconds());

    const { startDecoratorContent, endDecoratorContent } = elements;

    return (
      <div ref={ref} className={cx('Chip', className, css(cs?.container))}>
        {clickable && (
          <button className="Chip-actionElement" aria-labelledby={id} disabled={disabled} onClick={onClick} />
        )}
        <span id={id} className="Chip-label">
          {children}
        </span>
        {startDecoratorContent ? <div className="Chip-startDecorator">{startDecoratorContent}</div> : null}
        {endDecoratorContent ? <div className="Chip-endDecorator">{endDecoratorContent}</div> : null}
      </div>
    );
  },
);

export { Chip };
