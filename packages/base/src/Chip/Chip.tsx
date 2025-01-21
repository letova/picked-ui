import { css, cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useId } from 'react';

import { ClassNameGenerator, convertCSToClassName, getElementFromSlot } from '../utils';

import { ChipProps } from './Chip.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Chip', element, modificator });

const getMCN = (modificator?: string) => ClassNameGenerator.generate({ block: 'Chip', modificator });

export const Chip = forwardRef(
  (
    { className, children, slots = {}, cs, disabled = false, onClick }: ChipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const clickable = !!onClick;
    const id = useId();

    const { startDecorator, endDecorator } = slots;

    const startDecoratorElement = getElementFromSlot(startDecorator, {
      className: getCN('startDecorator'),
      disabled,
    });

    const endDecoratorElement = getElementFromSlot(endDecorator, {
      className: getCN('endDecorator'),
      disabled,
    });

    return (
      <div
        ref={ref}
        className={cx(
          getCN(),
          {
            [getMCN('disabled')]: disabled,
            [css(cs?.container)]: Boolean(cs?.container),
          },
          className,
        )}
        data-testid="chip"
      >
        {clickable && (
          <button
            className={cx(getCN('action'), convertCSToClassName(cs?.action, { disabled }))}
            aria-labelledby={id}
            disabled={disabled}
            onClick={onClick}
          />
        )}
        <span id={id} className={cx(getCN('label'), convertCSToClassName(cs?.label, { disabled }))}>
          {children}
        </span>
        {startDecoratorElement}
        {endDecoratorElement}
      </div>
    );
  },
);
