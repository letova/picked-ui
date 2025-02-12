import { CSSProperties } from "react";

export const getIsDraggingStyle = (isDragging: boolean): CSSProperties => {
    if (isDragging) return {};

    const styles: CSSProperties = {
        transition: '0.15s ease-out'
    };

    return styles;
}