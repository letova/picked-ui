import { css, cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { convertCSToClassName, getElementFromSlot } from '../../utils';

import { ChipProps } from './Chip.types';

const Chip = forwardRef(
  (
    { className, children, slots = {}, cs, disabled = false, onClick }: ChipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const clickable = !!onClick;
    const id = String(new Date().getMilliseconds());

    const { startDecorator, endDecorator } = slots;

    const startDecoratorElement = getElementFromSlot(`${id}startDecorator`, startDecorator, {
      className: 'Chip-startDecorator',
      disabled,
    });

    const endDecoratorElement = getElementFromSlot(`${id}endDecorator`, endDecorator, {
      className: 'Chip-endDecorator',
      disabled,
    });

    return (
      <div ref={ref} className={cx('Chip', className, { [css(cs?.container)]: Boolean(cs?.container) })}>
        {clickable && (
          <button
            className={cx('Chip-action', convertCSToClassName(cs?.action, { disabled }))}
            aria-labelledby={id}
            disabled={disabled}
            onClick={onClick}
          />
        )}
        <span id={id} className="Chip-label">
          {children}
        </span>
        {startDecoratorElement}
        {endDecoratorElement}
      </div>
    );
  },
);

export { Chip };
