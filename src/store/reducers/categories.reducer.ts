import { ActionType, createReducer } from "typesafe-actions";
import * as categoriesActions from "store/actions/categories.actions";
import * as categoryPlaylistsActions from "store/actions/categoryPlaylists.actions";
import { Category, CategoryPlaylist } from "../../api/categories";
import { fetchCategories } from "store/actions/categories.actions";
import { fetchCategoryPlaylists } from "../actions/categoryPlaylists.actions";
import { combineReducers } from "redux";

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
    .handleAction(fetchCategories.request, () => {
        return {
            ...categoriesInitialState,
            isFetching: true,
        };
    })
    .handleAction(
        fetchCategories.success,
        (state, { payload: { categories } }) => {
            return {
                ...state,
                isFetching: false,
                types: categories.items,
            };
        }
    )
    .handleAction(fetchCategories.failure, (state) => {
        return {
            ...state,
            isFetching: false,
            categoriesFetchingFailed: true,
        };
    });

const categoryPlaylistReducer = createReducer<
    CategoryPlaylistsState,
    CategoryPlaylistsAction
>(categoryPlaylistsInitialState)
    .handleAction(fetchCategoryPlaylists.request, () => {
        return {
            ...categoryPlaylistsInitialState,
            isFetching: true,
            categoriesPlaylistsFetchingFailed: false,
        };
    })
    .handleAction(
        fetchCategoryPlaylists.success,
        (state, { payload: { playlists } }) => {
            return {
                ...state,
                isFetching: false,
                playlists: playlists.items,
            };
        }
    )
    .handleAction(fetchCategoryPlaylists.failure, (state) => {
        return {
            ...state,
            isFetching: false,
            categoriesPlaylistsFetchingFailed: true,
        };
    });

export default combineReducers<CategoriesState>({
    mainCategories: categoriesReducer,
    playlists: categoryPlaylistReducer,
});
