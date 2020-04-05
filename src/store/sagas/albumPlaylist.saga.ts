import { put, call, select } from "redux-saga/effects";
import API, { AlbumPlaylistTracks } from "api/playlist";
import { NOT_FOUND, UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";
import { fetchAlbumPlaylist } from "../actions/playlist.actions";
import { push } from "connected-react-router";

export function* fetchAlbumPlaylistSaga(
    action: ReturnType<typeof fetchAlbumPlaylist.request>
): Generator {
    try {
        const token = yield select(getAuthorizationAccessToken);
        const headers = {
            Authorization: `Bearer ${token as string}`,
            "Content-Type": "application/json",
        };

        const response = yield call(
            API.fetchAlbumPlaylist,
            action.payload,
            headers
        );

        yield put(fetchAlbumPlaylist.success(response as AlbumPlaylistTracks));
    } catch (err) {
        yield put(fetchAlbumPlaylist.failure({ status: err.status }));

        // TODO: DRY, how to handle saga error handler?
        if (err.status === UNAUTHORIZED) {
            yield put(clearAccessToken());
        }

        // TODO: can this happen?
        if (err.status === NOT_FOUND) {
            yield put(push("/categories"));
        }
    }
}
