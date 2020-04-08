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
import types from "store/constants/albums.constants";
import { newReleasesFixture } from "fixtures/newReleases.fixture";
import createSagaMiddleware from "redux-saga";
import { fetchNewReleasesSaga } from "./newReleases.saga";
import { fetchNewReleases } from "../actions/albums.actions";

const sagaMiddleware = createSagaMiddleware();

describe("newReleasesSaga", () => {
    it("creates 'FETCH_NEW_RELEASES_SUCCESS' when authorized user is fetching new releases", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get(`/browse/new-releases`)
            .reply(OK, {
                albums: newReleasesFixture.albums,
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
        sagaTester.start(fetchNewReleasesSaga);

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchNewReleases.request(""));
        await sagaTester.waitFor(types.FETCH_NEW_RELEASES_SUCCESS);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_NEW_RELEASES_SUCCESS,
            payload: {
                playlists: newReleasesFixture.albums,
            },
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: {
                    playlists: newReleasesFixture.albums.items.map((item) => {
                        return {
                            ...item,
                            description: item.artists
                                .map(({ name }) => name)
                                .join(", "),
                        };
                    }),
                    isFetching: false,
                    playlistsFetchingFailed: false,
                },
            },
        });

        nock.cleanAll();
    });

    it("creates 'FETCH_NEW_RELEASES_FAILED' when unauthorized user is fetching new releases", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get(`/browse/new-releases`)
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
        sagaTester.start(fetchNewReleasesSaga);

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchNewReleases.request(""));
        await sagaTester.waitFor(types.FETCH_NEW_RELEASES_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_NEW_RELEASES_FAILED,
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
