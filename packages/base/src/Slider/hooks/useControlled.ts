import { useCallback, useRef, useState } from "react";

type Value = number | number[];

interface UseControlledParams {
    controlledValue: Value | undefined;
    defaultValue: Value;
}

type UserControlledReturn = [Value, (newValue: Value) => void];

export const useControlled = ({
    controlledValue,
    defaultValue,
}: UseControlledParams): UserControlledReturn => {
    const [valueState, setValue] = useState<Value>(defaultValue);

    const { current: isControlled } = useRef<boolean>(controlledValue != null);

    const value = isControlled ? controlledValue! : valueState;

    const setNewValue = useCallback((newValue: Value) => {
        if (!isControlled) return;

        setValue(newValue);
    }, []);

    return [value, setNewValue];
}