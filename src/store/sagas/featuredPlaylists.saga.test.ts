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
import types from "store/constants/featuredPlaylists.constants";
import createSagaMiddleware from "redux-saga";
import { fetchFeaturedPlaylistsSaga } from "./featuredPlaylists.saga";
import { featuredPlaylistsFixture } from "../../fixtures/featuredPlaylists.fixture";
import { fetchFeaturedPlaylists } from "../actions/featuredPlaylists.actions";

const sagaMiddleware = createSagaMiddleware();

describe("featuredPlaylistsSaga", () => {
    it("creates 'FETCH_FEATURED_PLAYLISTS_SUCCESS' when authorized user is fetching playlists", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get("/browse/featured-playlists")
            .reply(OK, {
                playlists: featuredPlaylistsFixture.playlists,
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
        sagaTester.start(fetchFeaturedPlaylistsSaga);

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchFeaturedPlaylists.request(""));
        await sagaTester.waitFor(types.FETCH_FEATURED_PLAYLISTS_SUCCESS);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_FEATURED_PLAYLISTS_SUCCESS,
            payload: {
                playlists: featuredPlaylistsFixture.playlists,
            },
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: {
                    playlists: featuredPlaylistsFixture.playlists.items,
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
            .get("/browse/featured-playlists")
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
        sagaTester.start(fetchFeaturedPlaylistsSaga);

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchFeaturedPlaylists.request(""));
        await sagaTester.waitFor(types.FETCH_FEATURED_PLAYLISTS_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_FEATURED_PLAYLISTS_FAILED,
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
