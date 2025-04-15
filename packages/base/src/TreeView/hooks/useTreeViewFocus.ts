import { useCallback, useEffect, useRef } from 'react';

import { UseTreeViewFocusResult } from '../TreeView.types';

/**
 * KEYBOARD INTERACTION GUIDE
 *
 * Autofocus:
 * The first node or the first selected node, if the node is selected before.
 *
 * Right arrow:
 * When focus is on a closed node, opens the node; focus does not move.
 * When focus is on an open node, moves focus to the first child node.
 * When focus is on an end node, does nothing.
 *
 * Left arrow:
 * When focus is on an open node, closes the node.
 * When focus is on a closed node, moves focus to its parent node.
 * When focus is on a root node, does nothing.
 *
 * Down Arrow:
 * Moves focus to the next node.
 *
 * Up Arrow:
 * Moves focus to the previous node.
 *
 * Space or Enter:
 * Toggles the selection state of the focused node.
 */

export interface UseTreeViewFocusOptions {
  initialNodeId?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const useTreeViewFocus = ({
  initialNodeId,
  autoFocus,
  disabled,
}: UseTreeViewFocusOptions): UseTreeViewFocusResult => {
  const prevFocusedNodeId = useRef<string | undefined>();
  const elementsMap = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    if (disabled || !initialNodeId) {
      return;
    }

    if (autoFocus) {
      focus(initialNodeId);
    } else {
      const currentElement = elementsMap.current[initialNodeId];

      if (!currentElement) {
        return;
      }

      currentElement.tabIndex = 0;
    }
  }, [autoFocus]);

  const handleSetElement = useCallback((element: HTMLLIElement | null) => {
    const id = element?.dataset.id;

    if (id) {
      elementsMap.current[id] = element;
    }
  }, []);

  const focus = (id: string) => {
    if (disabled) {
      return;
    }

    setFocusable(id);

    const currentElement = elementsMap.current[id];

    if (!currentElement) {
      return;
    }

    currentElement.focus();
    currentElement.classList.add('TreeItem--focused');

    if (prevFocusedNodeId.current) {
      const prevElement = elementsMap.current[prevFocusedNodeId.current];

      if (prevElement) {
        prevElement.classList.remove('TreeItem--focused');
      }
    }

    prevFocusedNodeId.current = id;
  };

  const getFocusedNodeId = () => {
    return prevFocusedNodeId.current;
  };

  const setFocusable = (id: string) => {
    if (disabled) {
      return;
    }

    const prevFocusableTabIndexId = prevFocusedNodeId.current || initialNodeId;

    if (prevFocusableTabIndexId) {
      const prevElement = elementsMap.current[prevFocusableTabIndexId];

      if (prevElement) {
        prevElement.tabIndex = -1;
      }
    }

    const currentElement = elementsMap.current[id];

    if (currentElement) {
      currentElement.tabIndex = 0;
    }
  };

  return { setElement: handleSetElement, focus, setFocusable, getFocusedNodeId };
};
