import React, { createContext, useEffect, useState } from "react";
import { NotificationType } from "./NotificationBar.styled";

export const NotificationContext = createContext<NotificationBarProviderProps>({
    showNotification: (message: string, notification: NotificationType) => {},
    message: "",
    notification: "",
    isVisible: false,
});

export interface NotificationBarProviderProps {
    showNotification(message: string, notification: NotificationType): void;
    message: string;
    notification: NotificationType;
    isVisible: boolean;
}

export interface NotificationBarProviderState {
    notification: NotificationType;
    message: string;
    isVisible: boolean;
}

export const NotificationBarProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<NotificationBarProviderState>({
        notification: "",
        message: "",
        isVisible: false,
    });

    const showNotification = (
        message: string,
        notification: NotificationType
    ) => {
        setState({
            notification,
            message,
            isVisible: true,
        });
    };

    useEffect(() => {
        if (!state.isVisible) {
            return;
        }

        const timer = setTimeout(() => {
            setState({
                notification: "",
                message: "",
                isVisible: false,
            });
        }, 3000);

        return (): void => {
            clearTimeout(timer);
        };
    }, [state.isVisible]);

    return (
        <NotificationContext.Provider value={{ ...state, showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
