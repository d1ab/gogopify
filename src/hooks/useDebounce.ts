import { useEffect, useState } from "react";

export const useDebounce = (phrase: string, debounceDelay = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState(phrase);

    useEffect(() => {
        const phraseTimer = setTimeout(() => {
            setDebouncedValue(phrase);
        }, debounceDelay);

        return () => {
            clearTimeout(phraseTimer);
        };
    }, [phrase]);

    return debouncedValue;
};
