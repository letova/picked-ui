import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useMemo, isValidElement, Children, Fragment, useState } from 'react';

import { useForkRef, useResizeObserver } from '../hooks';
import { ClassNameGenerator, convertCSToClassName } from '../utils';

import { SplitterProps, SplitterSectionProps } from './Splitter.types';
import { getSizes } from './utils';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Splitter', element, modificator });

export const Splitter = forwardRef(({ className, children, cs }: SplitterProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [containerSize, setContainerSize] = useState<number | undefined>();

  const { ref: observerRef } = useResizeObserver({
    onResize: (element) => {
      setContainerSize(element.clientWidth);
    },
  });

  const handleRef = useForkRef(ref, observerRef);

  const items = useMemo(() => {
    return Children.toArray(children)
      .filter(isValidElement)
      .map((node) => {
        const { props } = node as React.ReactElement<SplitterSectionProps>;
        return props;
      });
  }, [children]);

  const separatorCount = items.length - 1;

  const sizes = getSizes({
    containerSize: containerSize ? containerSize - 8 * separatorCount : 0,
    defaultChildSizes: items.map(({ defaultSize }) => ({ size: defaultSize })),
  });

  console.log('sizes', sizes);

  return (
    <div ref={handleRef} className={cx(getCN(), convertCSToClassName(cs?.container), className)}>
      {items.map((item, idx, items) => {
        const lastItem = idx === items.length - 1;

        return (
          <Fragment key={`split-section-${idx}`}>
            <div className={cx(getCN('section'), convertCSToClassName(cs?.section))}>{item.children}</div>
            {lastItem ? null : (
              <div
                className={cx(getCN('separator'), convertCSToClassName(cs?.separator))}
                role="separator"
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                |
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
});
