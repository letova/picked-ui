import { ForwardedRef, useEffect, useRef, useState } from "react";

import { useForkRef } from "../../hooks";

import { Mark, Orientation, ThumbCoords } from "../Slider.types";
import { getMarksFromParams, getThumbMoveType, getTrack, Track, getValuesArr, getThumbNewValue, getMarksValues, areEqualValues, extractThumbCoordsFromTouchEvent, extractThumbCoordsFromMouseEvent } from "../utils";

import { useControlled } from "./useControlled";

interface UseSliderParams {
    min: number;
    max: number;
    step: number;
    marks: boolean | Mark[];
    value?: number | number[];
    defaultValue?: number | number[];
    ref: ForwardedRef<HTMLSpanElement>;
    orientation: Orientation;
    onValueChange?: (value: number | number[]) => void;
    onValueChangeCommitted?: (value: number | number[]) => void;
}

interface UseSliderReturnValue {
    marks: Mark[];
    values: number[];
    track: Track;
    rootRef: ((instance: HTMLSpanElement | null) => void) | null;
}

interface SliderModel {
    touchId: number | null;
}

export const useSlider = ({
    min,
    max,
    step,
    marks: marksParam,
    value,
    defaultValue,
    ref,
    orientation,
    onValueChange,
    onValueChangeCommitted,
}: UseSliderParams): UseSliderReturnValue => {
    const ownerSliderRef = useRef<HTMLSpanElement>(null);
    const handleSliderRef = useForkRef(ref, ownerSliderRef);

    const modelRef = useRef<SliderModel>({
        touchId: null,
    });

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [valueDerived, setValue] = useControlled({
        controlledValue: value,
        defaultValue: defaultValue ?? min,
    });

    const handleChange = (_: Event, value: number | number[]) => {
        onValueChange?.(value);
    }

    const isRange = Array.isArray(value);
    const thumbMoveType = getThumbMoveType(marksParam);
    const marks = getMarksFromParams({ min, max, step, marks: marksParam, thumbMoveType });

    const values = getValuesArr(valueDerived, min);
    const track = getTrack({ isRange, values, min, max });

    const getThumbNewValueByThumbCoords = (thumbCoords: ThumbCoords): number => {
        const newValue: number = getThumbNewValue({
            min,
            max,
            step,
            marksValues: getMarksValues(marks),
            orientation,
            thumbMoveType,
            sliderDOMRect: ownerSliderRef.current!.getBoundingClientRect(),
            thumbCoords
        });

        return newValue;
    }

    // Event model
    const addTouchStartListener = () => {
        ownerSliderRef.current?.addEventListener('touchstart', handleTouchStart);
    }

    const removeTouchStartListener = () => {
        ownerSliderRef.current?.removeEventListener('touchstart', handleTouchStart);
    }

    const addTouchListeners = () => {
        ownerSliderRef.current?.addEventListener('touchmove', handleTouchMove);
        ownerSliderRef.current?.addEventListener('touchend', handleTouchEnd);
    }

    const removeTouchListeners = () => {
        ownerSliderRef.current?.removeEventListener('touchmove', handleTouchMove);
        ownerSliderRef.current?.removeEventListener('touchend', handleTouchEnd);
    }

    const addMouseListeners = () => {
        ownerSliderRef.current?.addEventListener('mousemove', handleMouseMove);
        ownerSliderRef.current?.addEventListener('mouseup', handleMouseUp);
    }

    const removeMouseListeners = () => {
        ownerSliderRef.current?.removeEventListener('mousemove', handleMouseMove);
        ownerSliderRef.current?.removeEventListener('mouseup', handleMouseUp);
    }

    const moveThumb = (event: Event, thumbCoords: ThumbCoords) => {
        const newValue = getThumbNewValueByThumbCoords(thumbCoords);

        setValue(newValue);

        if (!areEqualValues(newValue, valueDerived)) {
            handleChange(event, newValue)
        }
    }

    const endMoveThumb = (thumbCoords: ThumbCoords) => {
        const newValue = getThumbNewValueByThumbCoords(thumbCoords);

        onValueChangeCommitted?.(newValue);

        modelRef.current.touchId = null;
    }

    // 1. Handle touch events
    const handleTouchStart = (event: TouchEvent) => {
        const touch: Touch = event.changedTouches[0];

        if (touch != null) {
            modelRef.current.touchId = touch.identifier;
        }

        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromTouchEvent(event, modelRef.current.touchId);

        if (thumbCoords != null) {
            const newValue = getThumbNewValueByThumbCoords(thumbCoords);

            setValue(newValue);

            if (!areEqualValues(newValue, valueDerived)) {
                handleChange(event, newValue)
            }
        }

        addTouchListeners();
    }

    const handleTouchMove = (event: TouchEvent) => {
        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromTouchEvent(event, modelRef.current.touchId);

        if (thumbCoords == null) {
            return;
        }

        if (!isDragging) {
            setIsDragging(true);
        }

        moveThumb(event, thumbCoords);
    }

    const handleTouchEnd = (event: TouchEvent) => {
        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromTouchEvent(event, modelRef.current.touchId);
        setIsDragging(false);

        if (thumbCoords == null) {
            return;
        }

        endMoveThumb(thumbCoords);
        removeTouchListeners();
    }

    // 2. Handle mouse events
    const handleMouseMove = (event: MouseEvent) => {
        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromMouseEvent(event);

        if (thumbCoords == null) {
            return;
        }

        if (event.buttons === 0) {
            setIsDragging(false);
            removeTouchListeners();
        }

        moveThumb(event, thumbCoords);
    }

    const handleMouseUp = (event: MouseEvent) => {
        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromMouseEvent(event);

        if (thumbCoords == null) {
            return;
        }

        endMoveThumb(thumbCoords);
    }

    useEffect(() => {
        addTouchStartListener();
        addMouseListeners();

        return () => {
            removeTouchStartListener();
            removeTouchListeners();
            removeMouseListeners();
        }
    }, []);

    return {
        rootRef: handleSliderRef,
        marks,
        values,
        track,
    }
}