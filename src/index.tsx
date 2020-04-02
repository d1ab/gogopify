import React from "react";
import { render } from "react-dom";
import { App } from "App";
import * as serviceWorker from "./serviceWorker";
import initStore from "store/store";

import "./index.scss";
import { ProviderWrapper } from "./components/Provider/ProviderWrapper";

const Root = () => (
    <ProviderWrapper store={initStore()}>
        <App />
    </ProviderWrapper>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
