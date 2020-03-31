import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "App";
import * as serviceWorker from "./serviceWorker";
import store, { history } from "store/store";

import "./index.scss";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/defaultTheme";
import { BackdropProvider } from "./components/Backdrop/BackdropProvider";
import { NotificationBarProvider } from "./components/NotificationBar/NotificationBarProvider";
import { Router } from "react-router";

const Root = () => (
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={defaultTheme}>
                <NotificationBarProvider>
                    <BackdropProvider>
                        <Router history={history}>
                            <App />
                        </Router>
                    </BackdropProvider>
                </NotificationBarProvider>
            </ThemeProvider>
        </React.StrictMode>
    </Provider>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
