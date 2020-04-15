import { all, takeEvery } from "redux-saga/effects";
import { authorize } from "./actions/authorization.actions";
import { fetchCategories } from "./actions/categories.actions";
import { authorizationSaga } from "./sagas/authorization.saga";
import { fetchCategoriesSaga } from "./sagas/categories.saga";
import { fetchPlaylists } from "./actions/playlists.actions";
import { fetchPlaylistsSaga } from "./sagas/playlists.saga";
import { fetchAlbumPlaylist, fetchPlaylist } from "./actions/playlist.actions";
import { fetchPlaylistSaga } from "./sagas/playlist.saga";
import { fetchFeaturedPlaylists } from "./actions/featuredPlaylists.actions";
import { fetchFeaturedPlaylistsSaga } from "./sagas/featuredPlaylists.saga";
import { fetchNewReleases } from "./actions/albums.actions";
import { fetchNewReleasesSaga } from "./sagas/newReleases.saga";
import { fetchAlbumPlaylistSaga } from "./sagas/albumPlaylist.saga";
import { addToFavourites } from "./actions/favourites.actions";
import { addToFavouritesSaga } from "./sagas/favourites.saga";

export function* rootSaga(): Generator {
    yield all([
        takeEvery(authorize.request, authorizationSaga),
        takeEvery(fetchCategories.request, fetchCategoriesSaga),
        takeEvery(fetchPlaylists.request, fetchPlaylistsSaga),
        takeEvery(fetchFeaturedPlaylists.request, fetchFeaturedPlaylistsSaga),
        takeEvery(fetchPlaylist.request, fetchPlaylistSaga),
        takeEvery(fetchAlbumPlaylist.request, fetchAlbumPlaylistSaga),
        takeEvery(fetchNewReleases.request, fetchNewReleasesSaga),
        takeEvery(addToFavourites.request, addToFavouritesSaga),
    ]);
}
