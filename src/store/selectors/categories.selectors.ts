import { AppState } from "store/rootReducer";
import { createSelector } from "reselect";

const categoriesState = ({ categories }: AppState) => categories.mainCategories;

const categoriesPlaylistsState = ({ categories }: AppState) =>
    categories.playlists;

export const getMainCategories = createSelector(
    categoriesState,
    ({ types, isFetching, categoriesFetchingFailed }) => ({
        types,
        isFetching,
        categoriesFetchingFailed,
    })
);

export const getCategoryPlaylists = createSelector(
    categoriesPlaylistsState,
    ({ playlists, isFetching, categoriesPlaylistsFetchingFailed }) => ({
        playlists,
        isFetching,
        categoriesPlaylistsFetchingFailed,
    })
);
