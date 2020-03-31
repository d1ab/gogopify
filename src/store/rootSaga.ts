import { all, takeEvery } from "redux-saga/effects";
import { authorize } from "./actions/authorization.actions";
import { fetchCategories } from "./actions/categories.actions";
import { authorizationSaga } from "./sagas/authorization.saga";
import { fetchCategoriesSaga } from "./sagas/categories.saga";
import { fetchCategoryPlaylists } from "./actions/categoryPlaylists.actions";
import { fetchCategoryPlaylistsSaga } from "./sagas/categoryPlaylists.saga";

export function* rootSaga() {
    yield all([
        takeEvery(authorize.request, authorizationSaga),
        takeEvery(fetchCategories.request, fetchCategoriesSaga),
        takeEvery(fetchCategoryPlaylists.request, fetchCategoryPlaylistsSaga),
    ]);
}
