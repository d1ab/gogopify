import { createStore, applyMiddleware, compose } from "redux";
import { RootAction, RootState } from "typesafe-actions";
import createSagaMiddleware from "redux-saga";

import { composeEnhancers } from "./utils";
// import rootReducer from './root-reducer';
// import rootEpic from './root-epic';
// import services from '../services';

// configure middlewares
// const middlewares = [epicMiddleware];
const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
    (process.env.NODE_ENV !== "production" &&
        window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) || compose;

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(helloSaga);
// compose enhancers

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
