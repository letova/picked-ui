import { CSSProperties } from "react";

export const getIsDraggingStyle = (isDragging: boolean): CSSProperties => {
    if (isDragging) return {};

    const styles: CSSProperties = {
        transition: '0.15s ease-out'
    };

    return styles;
};

export const getInputStyle = (disabled: boolean): CSSProperties => {
    const styles: CSSProperties = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        border: 0,
        opacity: 0,
        cursor: disabled ? 'initial' : 'pointer',
    };

    return styles;
};