import { put, call, select } from "redux-saga/effects";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";
import API from "api/albums";
import { Playlists } from "api/categories";
import { NOT_FOUND, UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { push } from "connected-react-router";
import { fetchNewReleases } from "../actions/albums.actions";

export function* fetchNewReleasesSaga(): Generator {
    try {
        const token = yield select(getAuthorizationAccessToken);
        const headers = {
            Authorization: `Bearer ${token as string}`,
        };

        const response = yield call(
            // TODO: temporary walk-around, intarface unification needed
            // eslint-disable-next-line
            API.fetchNewReleases,
            headers
        );

        yield put(fetchNewReleases.success(response as Playlists));
    } catch (err) {
        yield put(fetchNewReleases.failure({ status: err.status }));

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
