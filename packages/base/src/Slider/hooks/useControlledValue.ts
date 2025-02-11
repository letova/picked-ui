import { useCallback, useRef, useState } from "react";

type Value = number | number[];

interface UseControlledValueParams {
    controlledValue: Value | undefined;
    defaultValue: Value;
}

type UserControlledValueReturn = [Value, (newValue: Value) => void];

export const useControlledValue = ({
    controlledValue,
    defaultValue,
}: UseControlledValueParams): UserControlledValueReturn => {
    const [valueState, setValueState] = useState<Value>(defaultValue);

    const { current: isControlled } = useRef<boolean>(controlledValue != null);

    const value = isControlled ? controlledValue! : valueState;

    const setUncontrolledValue = useCallback((newValue: Value) => {
        if (isControlled) return;

        setValueState(newValue);
    }, []);

    return [value, setUncontrolledValue];
}