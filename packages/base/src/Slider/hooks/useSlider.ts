import { ForwardedRef, useEffect, useRef, useState } from "react";

import { useForkRef } from "../../hooks";

import { Mark, Orientation, ThumbCoords } from "../Slider.types";
import { getMarksFromParams, getThumbMoveType, getTrack, Track, getValuesArr, getThumbNewValue, getMarksValues, areEqualValues, extractThumbCoordsFromTouchEvent, extractThumbCoordsFromMouseEvent, getOwnerDocument, getNearestValueIndex, setNewValue } from "../utils";

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
    isDragging: boolean;
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
    const ownerDocument = getOwnerDocument(ownerSliderRef.current);

    const addTouchStartListener = () => {
        ownerDocument.addEventListener('touchstart', handleTouchStart);
    }

    const removeTouchStartListener = () => {
        ownerDocument.removeEventListener('touchstart', handleTouchStart);
    }

    const addTouchListeners = () => {
        ownerDocument.addEventListener('touchmove', handleTouchMove);
        ownerDocument.addEventListener('touchend', handleTouchEnd);
    }

    const removeTouchListeners = () => {
        ownerDocument.removeEventListener('touchmove', handleTouchMove);
        ownerDocument.removeEventListener('touchend', handleTouchEnd);
    }

    const addMouseListeners = () => {
        ownerDocument.addEventListener('mousemove', handleMouseMove);
        ownerDocument.addEventListener('mouseup', handleMouseUp);
    }

    const removeMouseListeners = () => {
        ownerDocument.removeEventListener('mousemove', handleMouseMove);
        ownerDocument.removeEventListener('mouseup', handleMouseUp);
    }

    const addMouseDownListener = () => {
        ownerSliderRef.current?.addEventListener('mousedown', handleMouseDown);
    }

    const removeMouseDownListener = () => {
        ownerSliderRef.current?.removeEventListener('mousedown', handleMouseDown);
    }

    const moveThumb = (event: Event, thumbCoords: ThumbCoords) => {
        const thumbNewValue = getThumbNewValueByThumbCoords(thumbCoords);
        const index = getNearestValueIndex(values, thumbNewValue);
        const newValue = setNewValue(values, thumbNewValue, index);

        setValue(newValue);

        if (!areEqualValues(newValue, valueDerived)) {
            handleChange(event, newValue)
        }
    }

    const endMoveThumb = (thumbCoords: ThumbCoords) => {
        const thumbNewValue = getThumbNewValueByThumbCoords(thumbCoords);
        const index = getNearestValueIndex(values, thumbNewValue);
        const newValue = setNewValue(values, thumbNewValue, index);

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
    const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();

        addMouseListeners();

        const thumbCoords: ThumbCoords | null = extractThumbCoordsFromMouseEvent(event);

        if (thumbCoords != null) {
            moveThumb(event, thumbCoords);
        }
    }

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
        removeMouseListeners();
    };

    useEffect(() => {
        if (!disabled) {
            addTouchStartListener();
            addMouseDownListener();
        }

        return () => {
            removeTouchStartListener();
            removeTouchListeners();
            removeMouseDownListener();
            removeMouseListeners();
        }
    }, [disabled]);

    return {
        rootRef: handleSliderRef,
        isDragging,
        marks,
        values,
        track,
    }
}