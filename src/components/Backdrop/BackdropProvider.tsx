import React, { createContext, useCallback, useEffect, useState } from "react";

export const BackdropContext = createContext({
    showLoader: () => {},
    hideLoader: () => {},
    isVisible: false,
});

export const BackdropProvider: React.FC = ({ children }) => {
    const [isVisible, setVisibility] = useState(false);

    const showLoader = useCallback(() => setVisibility(true), []);

    const hideLoader = useCallback(() => setVisibility(false), []);

    return (
        <BackdropContext.Provider value={{ isVisible, showLoader, hideLoader }}>
            {children}
        </BackdropContext.Provider>
    );
};
