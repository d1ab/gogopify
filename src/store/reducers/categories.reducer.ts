import { ActionType, createReducer } from "typesafe-actions";
import * as categoriesActions from "store/actions/categories.actions";
import * as categoryPlaylistsActions from "store/actions/categoryPlaylists.actions";
import { Category, CategoryPlaylist } from "api/categories";
import { fetchCategories } from "store/actions/categories.actions";
import { fetchCategoryPlaylists } from "store/actions/categoryPlaylists.actions";
import { fetchFeaturedPlaylists } from "store/actions/featuredPlaylists.actions";
import { combineReducers } from "redux";
import { resetStateError } from "store/actions/utility.actions";
import { UNAUTHORIZED } from "http-status-codes";

export type CategoriesAction = ActionType<typeof categoriesActions>;
export type CategoryPlaylistsAction = ActionType<
    typeof categoryPlaylistsActions
>;

export interface CategoriesState {
    mainCategories: MainCategoriesState;
    playlists: CategoryPlaylistsState;
}

export type MainCategoriesState = Readonly<{
    types: Category[];
    isFetching: boolean;
    categoriesFetchingFailed: boolean;
}>;

export type CategoryPlaylistsState = Readonly<{
    playlists: CategoryPlaylist[];
    isFetching: boolean;
    categoriesPlaylistsFetchingFailed: boolean;
}>;

export const categoriesInitialState: MainCategoriesState = {
    types: [],
    isFetching: false,
    categoriesFetchingFailed: false,
};

export const categoryPlaylistsInitialState: CategoryPlaylistsState = {
    playlists: [],
    isFetching: false,
    categoriesPlaylistsFetchingFailed: false,
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

const categoryPlaylistReducer = createReducer<
    CategoryPlaylistsState,
    CategoryPlaylistsAction
>(categoryPlaylistsInitialState)
    .handleAction(
        [fetchCategoryPlaylists.request, fetchFeaturedPlaylists.request],
        (state) => {
            return {
                ...state,
                categoriesPlaylistsFetchingFailed: false,
            };
        }
    )
    .handleAction(
        [fetchCategoryPlaylists.success, fetchFeaturedPlaylists.success],
        (state, { payload: { playlists } }) => {
            return {
                ...state,
                isFetching: false,
                playlists: playlists.items,
            };
        }
    )
    .handleAction(
        [fetchCategoryPlaylists.failure, fetchFeaturedPlaylists.failure],
        (state, { payload: { status } }) => {
            return {
                ...state,
                isFetching: false,
                categoriesPlaylistsFetchingFailed: status !== UNAUTHORIZED,
            };
        }
    )
    .handleAction(resetStateError as any, () => {
        return categoryPlaylistsInitialState;
    });

export default combineReducers<CategoriesState>({
    mainCategories: categoriesReducer,
    playlists: categoryPlaylistReducer,
});
