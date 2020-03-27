import { Process } from "process";
import { compose } from "redux";

declare interface Window {
    // eslint-disable-next-line
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
}

declare interface NodeModule {
    hot?: { accept: (path: string, callback: () => void) => void };
}

declare interface System {
    // eslint-disable-next-line
    import<T = any>(module: string): Promise<T>;
}

declare const System: System;

// declare const process: Process;
