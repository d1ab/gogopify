import { ActionType, createReducer } from "typesafe-actions";
import * as categoriesActions from "store/actions/categories.actions";
import * as categoryPlaylistsActions from "store/actions/playlists.actions";
import { Category, Playlist } from "api/categories";
import { fetchCategories } from "store/actions/categories.actions";
import { fetchPlaylists } from "store/actions/playlists.actions";
import { fetchFeaturedPlaylists } from "store/actions/featuredPlaylists.actions";
import { combineReducers } from "redux";
import { resetStateError } from "store/actions/utility.actions";
import { UNAUTHORIZED } from "http-status-codes";
import { fetchNewReleases } from "../actions/albums.actions";

export type CategoriesAction = ActionType<typeof categoriesActions>;
export type PlaylistsAction = ActionType<typeof categoryPlaylistsActions>;

export interface CategoriesState {
    mainCategories: MainCategoriesState;
    playlists: PlaylistsState;
}

export type MainCategoriesState = Readonly<{
    types: Category[];
    isFetching: boolean;
    categoriesFetchingFailed: boolean;
}>;

export type PlaylistsState = Readonly<{
    playlists: Playlist[];
    isFetching: boolean;
    playlistsFetchingFailed: boolean;
}>;

export const categoriesInitialState: MainCategoriesState = {
    types: [],
    isFetching: false,
    categoriesFetchingFailed: false,
};

export const playlistsInitialState: PlaylistsState = {
    playlists: [],
    isFetching: false,
    playlistsFetchingFailed: false,
};

const categoriesReducer = createReducer<MainCategoriesState, CategoriesAction>(
    categoriesInitialState
)
    .handleAction(fetchCategories.request, (state) => {
        return {
            ...state,
            isFetching: true,
        };
    })
    .handleAction(
        fetchCategories.success,
        (state, { payload: { categories } }) => {
            return {
                ...state,
                types: categories.items,
                isFetching: false,
            };
        }
    )
    .handleAction(fetchCategories.failure, (state, { payload: { status } }) => {
        return {
            ...state,
            isFetching: false,
            categoriesFetchingFailed: status !== UNAUTHORIZED,
        };
    })
    .handleAction(resetStateError as any, () => {
        return categoriesInitialState;
    });

const playlistReducer = createReducer<PlaylistsState, PlaylistsAction>(
    playlistsInitialState
)
    .handleAction(
        [
            fetchPlaylists.request,
            fetchFeaturedPlaylists.request,
            fetchNewReleases.request,
        ],
        (state) => {
            return {
                ...state,
                playlistsFetchingFailed: false,
            };
        }
    )
    .handleAction(
        [
            fetchPlaylists.success,
            fetchFeaturedPlaylists.success,
            fetchNewReleases.success,
        ],
        (state, { payload: { playlists } }) => {
            return {
                ...state,
                isFetching: false,
                playlists: playlists.items.map(({ description, ...item }) => {
                    return {
                        ...item,
                        // put artist to description if its an album
                        description:
                            item.type === "album" && item.artists
                                ? item.artists
                                      .map(({ name }) => name)
                                      .join(", ")
                                : description,
                    };
                }),
            };
        }
    )
    .handleAction(
        [
            fetchPlaylists.failure,
            fetchFeaturedPlaylists.failure,
            fetchNewReleases.failure,
        ],
        (state, { payload: { status } }) => {
            return {
                ...playlistsInitialState,
                isFetching: false,
                playlistsFetchingFailed: status !== UNAUTHORIZED,
            };
        }
    )
    .handleAction(resetStateError as any, () => {
        return playlistsInitialState;
    });

export default combineReducers<CategoriesState>({
    mainCategories: categoriesReducer,
    playlists: playlistReducer,
});
