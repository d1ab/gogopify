import { authorize } from "store/actions/authorization.actions";
import authorization, { Authorization } from "api/authorization";
import { put, call } from "redux-saga/effects";

export function* authorizationSaga(): Generator {
    try {
        const response = yield call(authorization.authorize);

        yield put(authorize.success(response as Authorization));
    } catch (err) {
        yield put(authorize.failure(err.status));
    }
}
