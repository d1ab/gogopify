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
    playlistsInitialState,
} from "store/reducers/categories.reducer";
import types from "store/constants/playlists.constants";
import { playlistsFixture } from "fixtures/playlists.fixture";
import createSagaMiddleware from "redux-saga";
import { fetchPlaylists } from "store/actions/playlists.actions";
import { fetchPlaylistsSaga } from "./playlists.saga";

const sagaMiddleware = createSagaMiddleware();
const playlistId = "party";

describe("categoryPlaylistSaga", () => {
    it("creates 'FETCH_CATEGORY_PLAYLISTS_SUCCESS' when authorized user is fetching playlists", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get(`/browse/categories/${playlistId}/playlists`)
            .reply(OK, {
                playlists: playlistsFixture.playlists,
            });

        const sagaTester = new SagaTester({
            initialState: {
                authorization: authorizationInitialState,
                categories: {
                    mainCategories: categoriesInitialState,
                    playlists: playlistsInitialState,
                },
            },
            // eslint-disable-next-line
            reducers: {
                authorization: authorizationReducer,
                categories: categoriesReducer,
            },
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchPlaylistsSaga, { payload: playlistId });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchPlaylists.request(playlistId));
        await sagaTester.waitFor(types.FETCH_PLAYLISTS_SUCCESS);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_PLAYLISTS_SUCCESS,
            payload: {
                playlists: playlistsFixture.playlists,
            },
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: {
                    playlists: playlistsFixture.playlists.items,
                    isFetching: false,
                    playlistsFetchingFailed: false,
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
                    playlists: playlistsInitialState,
                },
            },
            // eslint-disable-next-line
            reducers: {
                authorization: authorizationReducer,
                categories: categoriesReducer,
            },
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchPlaylistsSaga, { payload: playlistId });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchPlaylists.request(playlistId));
        await sagaTester.waitFor(types.FETCH_PLAYLISTS_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_PLAYLISTS_FAILED,
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
                    playlistsFetchingFailed: true,
                },
            },
        });

        nock.cleanAll();
    });
});
