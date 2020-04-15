import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import {
    AuthorizationState,
    authorizationReducer,
} from "./reducers/authorization.reducer";
import categoriesReducers, {
    CategoriesState,
} from "./reducers/categories.reducer";
import { PlaylistState, playlistReducer } from "./reducers/playlist.reducer";
import {
    favouritesReducer,
    FavouritesState,
} from "./reducers/favourites.reducer";

export interface AppState {
    router: History<History.PoorMansUnknown>;
    authorization: AuthorizationState;
    categories: CategoriesState;
    playlist: PlaylistState;
    favourites: FavouritesState;
}

const createRootReducer = (history: History<History.PoorMansUnknown>) =>
    combineReducers<AppState>({
        // eslint-disable-next-line
        router: connectRouter(history) as any, // needs different interface?
        authorization: authorizationReducer,
        categories: categoriesReducers,
        playlist: playlistReducer,
        favourites: favouritesReducer,
    });

export default createRootReducer;
