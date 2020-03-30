import { compose } from "redux";

declare global {
    interface Window {
        // eslint-disable-next-line
        __REDUX_DEVTOOLS_EXTENSION__: any;
        // eslint-disable-next-line
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    }
}
