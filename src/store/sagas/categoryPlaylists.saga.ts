import { put, call, select } from "redux-saga/effects";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";
import API, { CategoryPlaylists } from "../../api/categories";
import { UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { removeAccessToken } from "../../utils/utils";
import { fetchCategoryPlaylists } from "../actions/categoryPlaylists.actions";

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
        yield put(fetchCategoryPlaylists.failure(err.status));

        // TODO: DRY, how to handle saga error handler?
        if (err.status === UNAUTHORIZED) {
            yield put(clearAccessToken());
            removeAccessToken();
        }
    }
}
