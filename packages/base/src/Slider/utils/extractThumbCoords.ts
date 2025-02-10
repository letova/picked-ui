import { ThumbCoords } from "../Slider.types";

export const extractThumbCoordsFromMouseEvent = (event: MouseEvent): ThumbCoords => {
    const coords: ThumbCoords = {
        x: event.clientX,
        y: event.clientY,
    }

    return coords;
}

export const extractThumbCoordsFromTouchEvent = (event: TouchEvent, touchId: number | null): ThumbCoords | null => {
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch: Touch = event.changedTouches[i];

        if (touch.identifier === touchId) {
            const coords: ThumbCoords = {
                x: touch.clientX,
                y: touch.clientY,
            };

            return coords;
        }
    };

    return null;
}