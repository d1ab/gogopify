import { put, call, select } from "redux-saga/effects";
import API, { PlaylistTracks } from "api/playlist";
import { NOT_FOUND, UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { removeAccessToken } from "utils/utils";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";
import { fetchPlaylist } from "../actions/playlist.actions";
import { push } from "connected-react-router";

export function* fetchPlaylistSaga(
    action: ReturnType<typeof fetchPlaylist.request>
): Generator {
    try {
        const token = yield select(getAuthorizationAccessToken);
        const headers = {
            Authorization: `Bearer ${token as string}`,
            "Content-Type": "application/json",
        };

        const response = yield call(API.fetchPlaylist, action.payload, headers);

        yield put(fetchPlaylist.success(response as PlaylistTracks));
    } catch (err) {
        yield put(fetchPlaylist.failure({ status: err.status }));

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
