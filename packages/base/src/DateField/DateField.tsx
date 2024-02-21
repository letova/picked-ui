import { useRef } from 'react';

import { useInputSelection, useRollingDate } from '../hooks';

import { DateFieldProps } from './DateField.types';
import { convertDateToSections } from './utils';

export const DateField = ({
  value: dateValue,
  minValue,
  maxValue,
  format = 'DD.MM.YYYY',
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
  onChange,
}: DateFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const sections = convertDateToSections(dateValue, format);
  const selectableSections = sections.filter((section) => section.type !== 'literal');

  const value = sections.reduce((result, section) => `${result}${section.value}`, '');

  const [selectionInputProps, { selectedSection, setFirstSection }] = useInputSelection({
    inputRef,
    value,
    selectableSections,
    readOnly,
    onFocus,
    onBlur,
    onKeyDown,
  });

  const rollingDateActions = useRollingDate({ value: dateValue, minValue, maxValue, onChange });

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    selectionInputProps.onKeyDown?.(e);

    if (!['Home', 'End', 'ArrowUp', 'PageUp', 'ArrowDown', 'PageDown'].includes(e.key)) {
      return;
    }

    const { type } = selectedSection ? selectedSection : setFirstSection();

    if (type === 'literal') {
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home') {
      rollingDateActions.increment({ type });
    }

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'End') {
      rollingDateActions.decrement({ type });
    }
  };

  return (
    <input
      ref={inputRef}
      value={value}
      readOnly={readOnly}
      {...selectionInputProps}
      onKeyDown={handleKeyDown}
      onChange={() => {}}
    />
  );
};
