import { ForwardedRef, useEffect, useRef, useState } from "react";

import { useForkRef } from "../../hooks";

import { Mark, Orientation, ThumbCoords } from "../Slider.types";
import { getMarksFromParams, getThumbMoveType, getTrack, Track, getValuesArr, getThumbNewValue, getMarksValues, areEqualValues, extractThumbCoordsFromTouchEvent, extractThumbCoordsFromMouseEvent } from "../utils";

import { useControlledValue } from "./useControlledValue";

interface UseSliderParams {
    min: number;
    max: number;
    step: number;
    marks: boolean | Mark[];
    disabled: boolean;
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
    dragCount: number;
}

const DRAG_COUNT_THRESHOLD = 2;

export const useSlider = ({
    min,
    max,
    step,
    marks: marksParam,
    disabled,
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
        dragCount: 0,
    });

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [valueDerived, setValue] = useControlledValue({
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
    }

    // 1. Handle touch events
    const handleTouchStart = (event: TouchEvent) => {
        const touch: Touch = event.changedTouches[0];

        if (touch != null) {
            modelRef.current.touchId = touch.identifier;
        }

        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromTouchEvent(event, modelRef.current.touchId);

        if (thumbCoords != null) {
            moveThumb(event, thumbCoords);
        }

        modelRef.current.dragCount = 0;

        addTouchListeners();
    }

    const handleTouchMove = (event: TouchEvent) => {
        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromTouchEvent(event, modelRef.current.touchId);

        if (thumbCoords == null) {
            return;
        }

        modelRef.current.dragCount += 1;

        if (!isDragging && modelRef.current.dragCount > DRAG_COUNT_THRESHOLD) {
            setIsDragging(true);
        }

        moveThumb(event, thumbCoords);
    }

    const handleTouchEnd = (event: TouchEvent) => {
        setIsDragging(false);

        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromTouchEvent(event, modelRef.current.touchId);

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

        modelRef.current.dragCount += 1;

        if (event.buttons === 0) {
            handleMouseUp(event);
            return;
        }

        if (!isDragging && modelRef.current.dragCount > DRAG_COUNT_THRESHOLD) {
            setIsDragging(true);
        }

        moveThumb(event, thumbCoords);
    }

    const handleMouseUp = (event: MouseEvent) => {
        setIsDragging(false);

        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromMouseEvent(event);

        if (thumbCoords == null) {
            return;
        }

        endMoveThumb(thumbCoords);
    }

    useEffect(() => {
        if (!disabled) {
            addTouchStartListener();
            addMouseListeners();
        }

        return () => {
            removeTouchStartListener();
            removeTouchListeners();
            removeMouseListeners();
        }
    }, [disabled]);

    return {
        rootRef: handleSliderRef,
        marks,
        values,
        track,
    }
}