import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "./rootSaga";
import createRootReducer, { AppState } from "./rootReducer";
import { isTestingEnv } from "utils/utils";
import { createMemoryHistory, createBrowserHistory } from "history";

export const history = isTestingEnv
    ? createMemoryHistory()
    : createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});

// create store, any added for testing purposes
const initStore = (initialState?: AppState | any) => {
    const store = createStore(
        createRootReducer(history),
        initialState || {},
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);

    return store;
};

export default initStore;
