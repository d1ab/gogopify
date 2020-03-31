import { all, takeEvery } from "redux-saga/effects";
import { authorize } from "./actions/authorization.actions";
import { fetchCategories } from "./actions/categories.actions";
import { authorizationSaga } from "./sagas/authorization.saga";
import { fetchCategoriesSaga } from "./sagas/categories.saga";

export function* rootSaga() {
    yield all([
        takeEvery(authorize.request, authorizationSaga),
        takeEvery(fetchCategories.request, fetchCategoriesSaga),
    ]);
}
