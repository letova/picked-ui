import { useEffect, useRef } from 'react';

export interface UseResizeObserverOptions {
  disabled?: boolean;
  onResize?: (element: Element) => void;
}

export const useResizeObserver = ({ disabled, onResize: onResizeCb }: UseResizeObserverOptions = {}) => {
  const onResize = (entities: ResizeObserverEntry[]) => {
    entities.forEach((entity) => {
      const { target } = entity;
      onResizeCb?.(target);
    });
  };

  const observerRef = useRef(new ResizeObserver(onResize));
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = observerRef.current;
    const currentElement = elementRef.current;

    if (currentElement && !disabled) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef.current, disabled]);

  return {
    ref: elementRef,
  };
};
