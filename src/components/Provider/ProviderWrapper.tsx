import React from "react";
import { history } from "store/store";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/defaultTheme";
import { NotificationBarProvider } from "../NotificationBar/NotificationBarProvider";
import { BackdropProvider } from "components/Backdrop/BackdropProvider";
import { Provider } from "react-redux";
import { AnyAction, Store } from "redux";

interface ProviderWrapper {
    // eslint-disable-next-line
    store: Store<any, AnyAction>;
}

export const ProviderWrapper: React.FC<ProviderWrapper> = ({
    children,
    store,
}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <React.StrictMode>
                <ThemeProvider theme={defaultTheme}>
                    <NotificationBarProvider>
                        <BackdropProvider>{children}</BackdropProvider>
                    </NotificationBarProvider>
                </ThemeProvider>
            </React.StrictMode>
        </ConnectedRouter>
    </Provider>
);

export const StorybookProviderWrapper: React.FC<ProviderWrapper> = ({
    children,
    store,
}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
        </ConnectedRouter>
    </Provider>
);
