import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useMemo, isValidElement, Children, Fragment, useRef } from 'react';

import { useForkRef, useResizeObserver } from '../hooks';
import { ClassNameGenerator, convertCSToClassName } from '../utils';

import { SplitterProps, SplitterSectionProps } from './Splitter.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Splitter', element, modificator });

export const Splitter = forwardRef(({ className, children, cs }: SplitterProps, ref: ForwardedRef<HTMLDivElement>) => {
  const sizesRef = useRef({
    containerSize: 0,
  });

  const { ref: observerRef } = useResizeObserver({
    onResize: (element) => {
      sizesRef.current.containerSize = element.clientWidth;
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

  return (
    <div ref={handleRef} className={cx(getCN(), convertCSToClassName(cs?.container), className)}>
      {items.map((item, idx) => {
        return (
          <Fragment key={`split-section-${idx}`}>
            <div>{item.children}</div>
            <div>|</div>
          </Fragment>
        );
      })}
    </div>
  );
});
