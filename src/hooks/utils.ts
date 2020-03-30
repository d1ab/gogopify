import { useEffect, useRef } from "react";

// eslint-disable-next-line
export const usePreviousProp = (prop: any) => {
    const prevProp = useRef();

    useEffect(() => {
        prevProp.current = prop;
    });

    return prevProp.current;
};
