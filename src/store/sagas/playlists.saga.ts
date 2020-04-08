import { put, call, select } from "redux-saga/effects";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";
import API, { Playlists } from "../../api/categories";
import { NOT_FOUND, UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { fetchPlaylists } from "../actions/playlists.actions";
import { push } from "connected-react-router";

export function* fetchPlaylistsSaga(
    action: ReturnType<typeof fetchPlaylists.request>
): Generator {
    try {
        const token = yield select(getAuthorizationAccessToken);
        const headers = {
            Authorization: `Bearer ${token as string}`,
        };

        const response = yield call(
            API.fetchPlaylists,
            action.payload,
            headers
        );

        yield put(fetchPlaylists.success(response as Playlists));
    } catch (err) {
        yield put(fetchPlaylists.failure({ status: err.status }));

        // TODO: DRY, how to handle saga error handler?
        if (err.status === UNAUTHORIZED) {
            yield put(clearAccessToken());
        }

        // TODO: can this happen?
        if (err.status === NOT_FOUND) {
            yield put(push("/"));
        }
    }
}
