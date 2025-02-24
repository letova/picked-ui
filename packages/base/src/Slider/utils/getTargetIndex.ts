import { ChangeEvent, KeyboardEvent } from "react";

export const getTargetIndex = (event: KeyboardEvent | ChangeEvent): number => {
    const dataIndex: string | null = event.currentTarget.getAttribute('data-index');

    if (dataIndex == null) {
        return 0;
    }

    const index = +dataIndex;

    return index;
}