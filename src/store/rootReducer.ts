import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import {
    AuthorizationState,
    authorizationReducer,
} from "./reducers/authorization.reducer";
import {
    categoriesReducer,
    CategoriesState,
} from "./reducers/categories.reducer";

export interface AppState {
    router: History<History.PoorMansUnknown>;
    authorization: AuthorizationState;
    categories: CategoriesState;
}

const createRootReducer = (history: History<History.PoorMansUnknown>) =>
    combineReducers({
        router: connectRouter(history),
        authorization: authorizationReducer,
        categories: categoriesReducer,
    });

export default createRootReducer;
