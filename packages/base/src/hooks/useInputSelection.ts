/* eslint-disable @typescript-eslint/ban-types */
import { useLayoutEffect, useState } from 'react';

import { useEqualCallback } from './useEqualCallback';

interface InputSelectionSection {
  contentType?: 'text' | 'numeric';
  startIndex: number;
  endIndex: number;
}

interface InputSelectionOptions<T extends {}>
  extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'readOnly' | 'onFocus' | 'onBlur' | 'onKeyDown'> {
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  selectableSections: (T & InputSelectionSection)[];
}

export const useInputSelection = <T extends {}>({
  inputRef,
  value,
  selectableSections,
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
}: InputSelectionOptions<T>) => {
  const [selectionRange, setSelectionRange] = useState<[number, number] | null>(null);

  let selectedSectionIndex: number | 'all' | undefined = selectionRange
    ? selectableSections.findIndex(
        (section) => selectionRange[0] >= section.startIndex && selectionRange[0] <= section.endIndex,
      )
    : undefined;

  if (selectionRange && selectionRange[0] === 0 && selectionRange[1] === value.length) {
    selectedSectionIndex = 'all';
  }

  if (selectedSectionIndex === -1) {
    selectedSectionIndex = 0;
  }

  const selectedSection =
    typeof selectedSectionIndex === 'number' ? selectableSections[selectedSectionIndex] : undefined;

  useLayoutEffect(() => {
    const inputElement = inputRef.current;

    if (!inputElement) {
      return;
    }

    if (selectedSectionIndex === undefined) {
      if (inputElement.scrollLeft) {
        // TODO: read discussion
        // https://bugs.webkit.org/show_bug.cgi?id=224425
        inputElement.scrollLeft = 0;
      }

      return;
    }

    const selectionStart = selectedSection ? selectedSection.startIndex : 0;
    const selectionEnd = selectedSection ? selectedSection.endIndex : value.length;

    if (selectionStart !== inputElement.selectionStart || selectionEnd !== inputElement.selectionEnd) {
      inputElement.setSelectionRange(selectionStart, selectionEnd);

      if (selectionRange && (selectionRange[0] !== selectionStart || selectionRange[1] !== selectionEnd)) {
        setSelectionRange([selectionStart, selectionEnd]);
      }
    }
  });

  const updateSelectionRange = () => {
    const selectionStart = inputRef.current!.selectionStart ?? 0;
    const selectionEnd = inputRef.current!.selectionEnd ?? value.length;

    if (!selectionRange || selectionStart !== selectionRange[0] || selectionEnd !== selectionRange[1]) {
      setSelectionRange([selectionStart, selectionEnd]);
    }
  };

  const inputMode = (() => {
    if (!selectedSectionIndex) {
      return 'text';
    }

    if (selectedSection) {
      return selectedSection.contentType || 'text';
    }

    return 'text';
  })();

  const handleClick = () => {
    if (readOnly) {
      return;
    }

    /**
     * The setTimeout solves the problem with irrelevant selection value
     * when an element is clicked several times
     */
    requestAnimationFrame(() => {
      updateSelectionRange();
    });
  };

  const handleFocus = useEqualCallback<React.FocusEventHandler<HTMLInputElement>>((...args) => {
    onFocus?.(...args);

    const inputElement = inputRef.current;

    if (!inputElement || readOnly) {
      return;
    }

    /**
     * The setTimeout solves the problem with zero selection
     * when an element receiving focus as a result of a click
     */
    setTimeout(() => {
      if (!inputElement || inputElement !== inputRef.current) {
        return;
      }

      updateSelectionRange();
    });
  });

  const handleBlur = useEqualCallback<React.FocusEventHandler<HTMLInputElement>>((...args) => {
    onBlur?.(...args);

    if (selectionRange) {
      setSelectionRange(null);
    }
  });

  // Delete = Fn + Backspace

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    onKeyDown?.(e);

    let nextSection: InputSelectionSection | undefined = undefined;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();

      if (selectedSectionIndex === 'all') {
        nextSection = selectableSections[0];
      } else if (selectedSectionIndex !== undefined && selectedSectionIndex > 0) {
        nextSection = selectableSections[selectedSectionIndex - 1];
      }
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();

      if (selectedSectionIndex === 'all') {
        nextSection = selectableSections[selectableSections.length - 1];
      } else if (selectedSectionIndex !== undefined && selectedSectionIndex < selectableSections.length - 1) {
        nextSection = selectableSections[selectedSectionIndex + 1];
      }
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
    }

    if (nextSection) {
      setSelectionRange([nextSection.startIndex, nextSection.endIndex]);
    }
  };

  const setFirstSection = () => {
    const firstSection = selectableSections[0];

    setSelectionRange([firstSection.startIndex, firstSection.endIndex]);

    return firstSection;
  };

  const setLastSection = () => {
    const lastSection = selectableSections[selectableSections.length - 1];

    setSelectionRange([lastSection.startIndex, lastSection.endIndex]);

    return lastSection;
  };

  const setNextSection = () => {
    const nextSection =
      typeof selectedSectionIndex === 'number' && selectedSectionIndex < selectableSections.length - 1
        ? selectableSections[selectedSectionIndex + 1]
        : selectableSections[0];

    setSelectionRange([nextSection.startIndex, nextSection.endIndex]);

    return nextSection;
  };

  return [
    {
      inputMode,
      autoComplete: 'off',
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    },
    { selectedSection, setFirstSection, setLastSection, setNextSection },
  ] as const;
};
