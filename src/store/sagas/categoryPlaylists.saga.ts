import { put, call, select } from "redux-saga/effects";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";
import API, { CategoryPlaylists } from "../../api/categories";
import { NOT_FOUND, UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { removeAccessToken } from "../../utils/utils";
import { fetchCategoryPlaylists } from "../actions/categoryPlaylists.actions";
import { push } from "connected-react-router";

export function* fetchCategoryPlaylistsSaga(
    action: ReturnType<typeof fetchCategoryPlaylists.request>
): Generator {
    try {
        const token = yield select(getAuthorizationAccessToken);
        const headers = {
            Authorization: `Bearer ${token as string}`,
        };

        const response = yield call(
            API.fetchCategoryPlaylists,
            action.payload,
            headers
        );

        yield put(
            fetchCategoryPlaylists.success(response as CategoryPlaylists)
        );
    } catch (err) {
        yield put(fetchCategoryPlaylists.failure({ status: err.status }));

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
