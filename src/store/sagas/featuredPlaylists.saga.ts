import { put, call, select } from "redux-saga/effects";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";
import API, { Playlists } from "../../api/categories";
import { NOT_FOUND, UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { push } from "connected-react-router";
import { fetchFeaturedPlaylists } from "../actions/featuredPlaylists.actions";

export function* fetchFeaturedPlaylistsSaga(): Generator {
    try {
        const token = yield select(getAuthorizationAccessToken);
        const headers = {
            Authorization: `Bearer ${token as string}`,
        };

        const response = yield call(
            // TODO: temporary walk-around, intarface unification needed
            // eslint-disable-next-line
            API.fetchFeaturedPlaylists,
            headers
        );

        yield put(fetchFeaturedPlaylists.success(response as Playlists));
    } catch (err) {
        yield put(fetchFeaturedPlaylists.failure({ status: err.status }));

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
