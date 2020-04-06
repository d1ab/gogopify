import nock from "nock";
import API from "api/api";
import { nockHeaders } from "setupTests";
import { BAD_REQUEST, OK } from "http-status-codes";
import SagaTester from "redux-saga-tester";
import {
    authorizationInitialState,
    authorizationReducer,
} from "store/reducers/authorization.reducer";
import categoriesReducer, {
    categoriesInitialState,
    categoryPlaylistsInitialState,
} from "store/reducers/categories.reducer";
import types from "store/constants/categoryPlaylists.constants";
import { categoryPlaylistsFixture } from "fixtures/categoryPlaylists.fixture";
import createSagaMiddleware from "redux-saga";
import { fetchCategoryPlaylists } from "store/actions/categoryPlaylists.actions";
import { fetchCategoryPlaylistsSaga } from "./categoryPlaylists.saga";

const sagaMiddleware = createSagaMiddleware();
const playlistId = "party";

describe("categoryPlaylistSaga", () => {
    it("creates 'FETCH_CATEGORY_PLAYLISTS_SUCCESS' when authorized user is fetching playlists", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get(`/browse/categories/${playlistId}/playlists`)
            .reply(OK, {
                playlists: categoryPlaylistsFixture.playlists,
            });

        const sagaTester = new SagaTester({
            initialState: {
                authorization: authorizationInitialState,
                categories: {
                    mainCategories: categoriesInitialState,
                    playlists: categoryPlaylistsInitialState,
                },
            },
            // eslint-disable-next-line
            reducers: {
                authorization: authorizationReducer,
                categories: categoriesReducer,
            },
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchCategoryPlaylistsSaga, { payload: playlistId });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: categoryPlaylistsInitialState,
            },
        });

        sagaTester.dispatch(fetchCategoryPlaylists.request(playlistId));
        await sagaTester.waitFor(types.FETCH_CATEGORY_PLAYLISTS_SUCCESS);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_CATEGORY_PLAYLISTS_SUCCESS,
            payload: {
                playlists: categoryPlaylistsFixture.playlists,
            },
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: {
                    playlists: categoryPlaylistsFixture.playlists.items,
                    isFetching: false,
                    categoriesPlaylistsFetchingFailed: false,
                },
            },
        });

        nock.cleanAll();
    });

    it("creates 'FETCH_CATEGORY_PLAYLISTS_FAILED' when unauthorized user is fetching playlists", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get(`/browse/categories/${playlistId}/playlists`)
            .reply(BAD_REQUEST, {
                status: BAD_REQUEST,
            });

        const sagaTester = new SagaTester({
            initialState: {
                authorization: authorizationInitialState,
                categories: {
                    mainCategories: categoriesInitialState,
                    playlists: categoryPlaylistsInitialState,
                },
            },
            // eslint-disable-next-line
            reducers: {
                authorization: authorizationReducer,
                categories: categoriesReducer,
            },
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchCategoryPlaylistsSaga, { payload: playlistId });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: categoryPlaylistsInitialState,
            },
        });

        sagaTester.dispatch(fetchCategoryPlaylists.request(playlistId));
        await sagaTester.waitFor(types.FETCH_CATEGORY_PLAYLISTS_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_CATEGORY_PLAYLISTS_FAILED,
            payload: {
                status: BAD_REQUEST,
            },
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: {
                    playlists: [],
                    isFetching: false,
                    categoriesPlaylistsFetchingFailed: true,
                },
            },
        });

        nock.cleanAll();
    });
});
