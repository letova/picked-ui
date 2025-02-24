import { useRef } from 'react';

interface UseResizableElementOptions {
  min?: number;
  max?: number;
  onChangeWidth?: (nextWidth: number, prevWidth: number) => void;
  onResizeStart?: VoidFunction;
  onResizeStop?: VoidFunction;
}

interface UREStore {
  separatorPlacement: 'left' | 'right';
  offsetToSeparator: number;
  resizableElement?: HTMLElement | null;
}

/**
 * Follows the CSS specification behavior for min and max
 * If min > max, then the min have priority
 */
export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const useResizableElement = (options: UseResizableElementOptions) => {
  const storeRef = useRef<UREStore>({ offsetToSeparator: 0, separatorPlacement: 'right' });

  const handleSetResizableElement = (el: HTMLElement | null) => {
    storeRef.current.resizableElement = el;
  };

  const stopListening = () => {
    document.body.style.removeProperty('cursor');

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    stopListening();
    options.onResizeStop?.();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (event.buttons === 0) {
      handleMouseUp();
      return;
    }

    const resizableElementRect = storeRef.current.resizableElement!.getBoundingClientRect();

    let nextWidth = storeRef.current.offsetToSeparator;

    if (storeRef.current.separatorPlacement === 'right') {
      nextWidth += event.clientX - resizableElementRect.left;
    } else {
      nextWidth += resizableElementRect.right - event.clientX;
    }

    nextWidth = clamp(nextWidth, options.min ?? 0, options.max ?? Infinity);

    options.onChangeWidth?.(nextWidth, resizableElementRect.width);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    // Only handle left clicks
    if (event.button !== 0) {
      return;
    }

    // Avoid text selection
    event.preventDefault();

    // Resize separator lags behind the cursor
    document.body.style.cursor = 'col-resize';

    const resizableElementRect = storeRef.current.resizableElement!.getBoundingClientRect();

    const separatorPlacement =
      event.clientX < resizableElementRect.left + resizableElementRect.width / 2 ? 'left' : 'right';

    storeRef.current.separatorPlacement = separatorPlacement;
    storeRef.current.offsetToSeparator =
      separatorPlacement === 'right'
        ? resizableElementRect.right - event.clientX
        : event.clientX - resizableElementRect.left;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    options.onResizeStart?.();
  };

  return {
    separator: { onMouseDown: handleMouseDown },
    setResizableElement: handleSetResizableElement,
  };
};
