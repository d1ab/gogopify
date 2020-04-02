import nock from "nock";
import API from "api/api";
import { nockHeaders } from "setupTests";
import { BAD_REQUEST, OK } from "http-status-codes";
import SagaTester from "redux-saga-tester";
import {
    authorizationInitialState,
    authorizationReducer,
} from "store/reducers/authorization.reducer";
import types from "store/constants/playlist.constants";
import createSagaMiddleware from "redux-saga";
import { tracksFixture } from "../../fixtures/tracks.fixture";
import {
    playlistInitialState,
    playlistReducer,
} from "../reducers/playlist.reducer";
import { fetchPlaylistSaga } from "./playlist.saga";
import { fetchPlaylist } from "../actions/playlist.actions";

const sagaMiddleware = createSagaMiddleware();
const playlistId = "37i9dQZF1DXbm6HfkbMtFZ";

describe("categoryPlaylistSaga", () => {
    it("creates 'FETCH_PLAYLIST_SUCCESS' when authorized user is fetching playlist tracks", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get(`/playlists/${playlistId}/tracks`)
            .query({
                offset: 0,
                limit: 100,
            })
            .reply(OK, tracksFixture);

        const sagaTester = new SagaTester({
            initialState: {
                playlist: playlistInitialState,
            },
            // eslint-disable-next-line
            reducers: {
                authorization: authorizationReducer,
                playlist: playlistReducer as any,
            },
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchPlaylistSaga, { payload: playlistId });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            playlist: playlistInitialState,
        });

        sagaTester.dispatch(fetchPlaylist.request(playlistId));
        await sagaTester.waitFor(types.FETCH_PLAYLIST_SUCCESS);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_PLAYLIST_SUCCESS,
            payload: tracksFixture,
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            playlist: {
                items: tracksFixture.items,
                isFetching: false,
                playlistFetchingFailed: false,
            },
        });

        nock.cleanAll();
    });

    it("creates 'FETCH_PLAYLIST_FAILED' when unauthorized user is fetching playlist tracks", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get(`/playlists/${playlistId}/tracks`)
            .query({
                offset: 0,
                limit: 100,
            })
            .reply(BAD_REQUEST);

        const sagaTester = new SagaTester({
            initialState: {
                playlist: playlistInitialState,
            },
            // eslint-disable-next-line
            reducers: {
                authorization: authorizationReducer,
                playlist: playlistReducer as any,
            },
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchPlaylistSaga, { payload: playlistId });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            playlist: playlistInitialState,
        });

        sagaTester.dispatch(fetchPlaylist.request(playlistId));
        await sagaTester.waitFor(types.FETCH_PLAYLIST_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_PLAYLIST_FAILED,
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            playlist: {
                items: [],
                isFetching: false,
                playlistFetchingFailed: true,
            },
        });

        nock.cleanAll();
    });
});
