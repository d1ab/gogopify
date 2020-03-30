import React, { useLayoutEffect, useState } from "react";

interface MousePosition {
    isMouseDown: boolean;
    isMouseUp: boolean;
    mouseX: number;
}

export const useMousePosition = (
    ref: React.RefObject<HTMLDivElement>
): MousePosition => {
    const [state, setState] = useState({
        isMouseDown: false,
        isMouseUp: false,
        mouseX: 0,
    });

    useLayoutEffect(() => {
        const elementRef = ref.current;

        const mouseDownHandler = (): void =>
            setState((currentState) => ({
                ...currentState,
                isMouseDown: true,
                isMouseUp: false,
            }));

        const mouseUpHandler = (): void =>
            setState((currentState) => ({
                ...currentState,
                isMouseDown: false,
                isMouseUp: true,
            }));

        const mouseMoveHandler = (e: MouseEvent): void => {
            setState((currentState) => {
                return { ...currentState, mouseX: e.pageX };
            });
        };

        const mouseClickHandler = (e: MouseEvent): void => {
            setState((currentState) => ({
                ...currentState,
                isMouseUp: false,
                isMouseDown: false,
            }));
        };

        if (elementRef) {
            elementRef.addEventListener("mousedown", mouseDownHandler);
            elementRef.addEventListener("mouseup", mouseUpHandler);
            elementRef.addEventListener("mousemove", mouseMoveHandler);
            elementRef.addEventListener("click", mouseClickHandler);
        }

        return (): void => {
            if (elementRef) {
                elementRef.removeEventListener("onmousedown", mouseDownHandler);
                elementRef.removeEventListener("mouseup", mouseUpHandler);
                elementRef.removeEventListener("mousemove", mouseMoveHandler);
                elementRef.removeEventListener("click", mouseClickHandler);
            }
        };
        // eslint-disable-next-line
    }, []);

    return state;
};
