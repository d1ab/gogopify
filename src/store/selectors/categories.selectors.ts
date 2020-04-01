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

export const getCategoryPlaylistInfoById = (id: string) =>
    createSelector(categoriesPlaylistsState, ({ playlists }) => {
        const currentPlaylist = playlists.find(
            (playlist) => playlist.id === id
        );

        return currentPlaylist
            ? {
                  image: currentPlaylist.images[0].url,
                  name: currentPlaylist.name,
              }
            : {
                  image:
                      "https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png",
                  name: "",
              };
    });
