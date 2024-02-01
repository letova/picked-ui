import equal from 'fast-deep-equal';
import { useId, useLayoutEffect, useRef, useState } from 'react';

import { roundFractionDigits } from '../utils';

import { useLatest } from './useLatest';

interface UseCollapseElementsParams {
  maxCount?: number | 'responsive';
  gap?: number;
  collapsedElementsCounter?:
    | boolean
    | {
        baseWidth?: number;
        symbolWidth?: number;
      };
}

interface WidthMap {
  resizeContainer: number;
  container: number;
  children: number[];
  childrenSum: number;
}

const DEFAULT_TCE_OPTIONS = { enabled: true, baseWidth: 25, symbolWidth: 8 };

const prepareCollapsedElementsCounterOptions = (value: UseCollapseElementsParams['collapsedElementsCounter']) => {
  if (typeof value === 'boolean') {
    return value ? DEFAULT_TCE_OPTIONS : { enabled: false, baseWidth: 0, symbolWidth: 0 };
  }

  return { ...DEFAULT_TCE_OPTIONS, ...value };
};

const calculateContainerWidthMap = (element: Element, collapsedElementsCounterId: string) => {
  const children = Array.from(element.children)
    .filter((child) => {
      return child.id !== collapsedElementsCounterId;
    })
    .map((child) => {
      return roundFractionDigits(child.getBoundingClientRect().width, 2);
    });

  return {
    container: element.getBoundingClientRect().width,
    children,
    childrenSum: children.reduce((result, width) => {
      return result + width;
    }, 0),
  };
};

export const useCollapseElements = ({
  maxCount,
  gap = 0,
  collapsedElementsCounter = true,
}: UseCollapseElementsParams) => {
  const collapsedElementsCounterId = useId();

  const [widthMap, setWidthMap] = useState<WidthMap>({
    resizeContainer: 0,
    container: 0,
    children: [],
    childrenSum: 0,
  });

  const containerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const collapsedElementsCounterOptions = prepareCollapsedElementsCounterOptions(collapsedElementsCounter);

  const setNextWidthMap = (nextWidthMap: WidthMap) => {
    if (!equal(nextWidthMap, widthMap)) {
      setWidthMap(nextWidthMap);
    }
  };

  const latestSetNextWidthMap = useLatest(setNextWidthMap);

  const observerRef = useRef(
    new ResizeObserver((entries) => {
      const containerElement = entries[0].target;

      const nextWidthMap = {
        resizeContainer: document.body.clientWidth,
        ...calculateContainerWidthMap(containerElement, collapsedElementsCounterId),
      };

      if (nextWidthMap.resizeContainer === widthMap.resizeContainer && nextWidthMap.container !== widthMap.container) {
        throw new Error(
          `UseCollapseElements Hook Error: the width of the container always changes - set a fixed width!
          \nCurrent width: ${nextWidthMap.container}
          \nPrev width: ${widthMap.container}
          \nContainer className: ${containerElement.className || '-'}`,
        );
      }

      latestSetNextWidthMap.current?.(nextWidthMap);
    }),
  );

  useLayoutEffect(() => {
    if (!containerRef.current || !maxCount) {
      return;
    }

    /**
     * Resize Observer ensures correct calculation of width when, during the initial rendering,
     * the font is loaded later than the calculations are made
     */
    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current.unobserve(containerRef.current as HTMLDivElement);
    };
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !maxCount) {
      return;
    }

    const nextChildrenLength = Array.from(containerRef.current.children).filter((child) => {
      return child.id !== collapsedElementsCounterId;
    }).length;

    if (nextChildrenLength !== widthMap.children.length) {
      setNextWidthMap({
        resizeContainer: document.body.clientWidth,
        ...calculateContainerWidthMap(containerRef.current, collapsedElementsCounterId),
      });
    }
  });

  /**
   * RESULT
   */
  if (!maxCount) {
    return { containerRef };
  }

  if (typeof maxCount === 'number') {
    return { containerRef, collapseIndex: maxCount, collapsedCount: widthMap.children.length - maxCount };
  }

  let collapseIndex;
  let collapsedCount;
  let totalWidth = 0;

  for (let idx = 0; idx < widthMap.children.length; idx++) {
    const childWidth = widthMap.children[idx];
    const currentGap = idx === 0 ? 0 : gap;
    const complexWith = childWidth + currentGap;

    if (totalWidth + complexWith > widthMap.container) {
      const nextCollapsedCount = widthMap.children.length - idx;
      const symbolsCount = nextCollapsedCount.toString().length;

      const collapsedCounterElementWidth =
        collapsedElementsCounterOptions.baseWidth + collapsedElementsCounterOptions.symbolWidth * symbolsCount;

      const collapsedCounterComplexWidth = collapsedCounterElementWidth + currentGap;

      if (totalWidth + collapsedCounterComplexWidth > widthMap.container) {
        collapseIndex = idx - 1;
        collapsedCount = nextCollapsedCount + 1;
      } else {
        collapseIndex = idx;
        collapsedCount = nextCollapsedCount;
      }

      break;
    }

    totalWidth = totalWidth + complexWith;
  }

  return { containerRef, collapsedElementsCounterId, collapseIndex, collapsedCount };
};
