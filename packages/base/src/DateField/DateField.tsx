import { useRef, useState } from 'react';

import { useEqualCallback } from '../hooks';

import { SELECTABLE_SECTIONS, VALUE } from './constants';

export const DateField = ({ readOnly, onFocus, onBlur }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectableSectionIndex, setSelectableSectionIndex] = useState<number | 'all' | undefined>();

  const selectedSection =
    typeof selectableSectionIndex === 'number' ? SELECTABLE_SECTIONS[selectableSectionIndex] : undefined;

  const updateSelectableSectionIndex = () => {
    const selectionStart = inputRef.current!.selectionStart ?? 0;

    const nextSelectableSectionIndex = SELECTABLE_SECTIONS.findIndex(
      (section) => selectionStart >= section.startIndex && selectionStart <= section.endIndex,
    );

    setSelectableSectionIndex(nextSelectableSectionIndex === -1 ? 0 : nextSelectableSectionIndex);
  };

  const inputMode = (() => {
    if (!selectableSectionIndex) {
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

    updateSelectableSectionIndex();
  };

  const handleFocus = useEqualCallback<React.FocusEventHandler<HTMLInputElement>>((...args) => {
    onFocus?.(...args);

    const inputElement = inputRef.current;

    if (!inputElement || readOnly) {
      return;
    }

    if (
      inputElement.value.length &&
      Number(inputElement.selectionEnd) - Number(inputElement.selectionStart) === inputElement.value.length
    ) {
      setSelectableSectionIndex('all');
    } else {
      updateSelectableSectionIndex();
    }
  });

  const handleBlur = useEqualCallback<React.FocusEventHandler<HTMLInputElement>>((...args) => {
    onBlur?.(...args);
    setSelectableSectionIndex(undefined);
  });

  return (
    <input
      ref={inputRef}
      value={VALUE}
      inputMode={inputMode}
      autoComplete="off"
      readOnly={readOnly}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
