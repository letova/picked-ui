import { useCallback, useLayoutEffect, useRef } from 'react';

export const useEqualCallback = <T extends (...args: any[]) => any>(cb: T) => {
  const cbRef = useRef(cb);

  useLayoutEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  return useCallback((...args: Parameters<T>) => {
    return cbRef.current.apply(null, args) as T;
  }, []);
};
