import { useRef } from 'react';

import { useInputSelection } from '../hooks';

import { DateFieldProps } from './DateField.types';
import { convertDateToSections } from './utils';

export const DateField = ({
  value: dateValue,
  format = 'DD.MM.YYYY',
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
}: DateFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const sections = convertDateToSections(dateValue, format);
  const selectableSections = sections.filter((section) => section.type !== 'literal');

  const value = sections.reduce((result, section) => `${result}${section.value}`, '');

  const [selectionInputProps] = useInputSelection({
    inputRef,
    value,
    selectableSections,
    readOnly,
    onFocus,
    onBlur,
    onKeyDown,
  });

  return <input ref={inputRef} value={value} readOnly={readOnly} {...selectionInputProps} onChange={() => {}} />;
};
