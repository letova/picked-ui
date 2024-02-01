import { useRef } from 'react';

export const useLatest = <T>(value: T) => {
  const valueRef = useRef<T | null>(null);

  if (value !== valueRef.current) {
    valueRef.current = value;
  }

  return valueRef;
};
