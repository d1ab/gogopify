import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import {
    AuthorizationState,
    authorizationReducer,
} from "./reducers/authorization.reducer";

export interface AppState {
    router: History<History.PoorMansUnknown>;
    authorization: AuthorizationState;
}

const createRootReducer = (history: History<History.PoorMansUnknown>) =>
    combineReducers({
        router: connectRouter(history),
        authorization: authorizationReducer,
    });

export default createRootReducer;
