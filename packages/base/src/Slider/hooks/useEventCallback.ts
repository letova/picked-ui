import { useCallback, useRef } from "react";

export const useEventCallback = <T extends (...args: any[]) => any>(fn: T): T => {
    const ref = useRef<T>(fn);

    ref.current = fn;

    return useCallback((...args: Parameters<T>) => {
        return ref.current(...args);
    }, []) as T;
}