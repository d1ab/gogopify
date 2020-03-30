import { all, takeEvery } from "redux-saga/effects";
import { authorize } from "./actions/authorization.actions";
import { authorizationSaga } from "./sagas/authorization.saga";

export function* rootSaga() {
    yield all([takeEvery(authorize.request, authorizationSaga)]);
}
