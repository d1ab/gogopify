import { put, call, select } from "redux-saga/effects";
import API, { Categories } from "api/categories";
import { fetchCategories } from "store/actions/categories.actions";
import { UNAUTHORIZED } from "http-status-codes";
import { clearAccessToken } from "../actions/authorization.actions";
import { removeAccessToken } from "utils/utils";
import { getAuthorizationAccessToken } from "../selectors/authorization.selectors";

export function* fetchCategoriesSaga(
    action: ReturnType<typeof fetchCategories.request>
): Generator {
    try {
        const token = yield select(getAuthorizationAccessToken);
        const headers = {
            Authorization: `Bearer ${token as string}`,
        };

        const response = yield call(
            API.fetchCategories,
            action.payload,
            headers
        );

        yield put(fetchCategories.success(response as Categories));
    } catch (err) {
        yield put(fetchCategories.failure(err.status));

        // TODO: DRY, how to handle saga error handler?
        if (err.status === UNAUTHORIZED) {
            yield put(clearAccessToken());
            removeAccessToken();
        }
    }
}
