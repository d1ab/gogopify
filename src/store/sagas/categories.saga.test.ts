import createSagaMiddleware from "redux-saga";
import SagaTester from "redux-saga-tester";
import nock from "nock";
import types from "store/constants/categories.constants";
import expect from "expect";
import { BAD_REQUEST, OK } from "http-status-codes";
import categoriesReducer, {
    categoriesInitialState,
    playlistsInitialState,
} from "store/reducers/categories.reducer";
import { authorizationReducer } from "../reducers/authorization.reducer";
import { nockHeaders } from "setupTests";
import API from "api/api";
import { fetchCategoriesSaga } from "./categories.saga";
import { fetchCategories } from "../actions/categories.actions";
import { categoriesFixture } from "../../fixtures/categories.fixture";
import { authorizationInitialState } from "../reducers/authorization.reducer";

const sagaMiddleware = createSagaMiddleware();

describe("categoriesSaga", () => {
    it("creates 'FETCH_CATEGORIES_SUCCESS' when authorized user is fetching categories", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get("/browse/categories")
            .query({
                limit: 30,
            })
            .reply(OK, {
                categories: categoriesFixture.categories,
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
        sagaTester.start(fetchCategoriesSaga, { payload: 30 });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchCategories.request(30));
        await sagaTester.waitFor(types.FETCH_CATEGORIES_SUCCESS);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_CATEGORIES_SUCCESS,
            payload: {
                categories: categoriesFixture.categories,
            },
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: {
                    types: categoriesFixture.categories.items,
                    isFetching: false,
                    categoriesFetchingFailed: false,
                },
                playlists: playlistsInitialState,
            },
        });

        nock.cleanAll();
    });

    it("creates 'FETCH_CATEGORIES_FAILED' when unauthorized user is fetching categories", async () => {
        nock(API.baseApiUrl!, { allowUnmocked: true })
            .defaultReplyHeaders(nockHeaders)
            .get("/browse/categories")
            .query({
                limit: 30,
            })
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
                categories: categoriesReducer,
                authorization: authorizationReducer,
            },
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchCategoriesSaga, { payload: 30 });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                mainCategories: categoriesInitialState,
                playlists: playlistsInitialState,
            },
        });

        sagaTester.dispatch(fetchCategories.request(30));
        await sagaTester.waitFor(types.FETCH_CATEGORIES_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_CATEGORIES_FAILED,
            payload: {
                status: BAD_REQUEST,
            },
        });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: {
                playlists: playlistsInitialState,
                mainCategories: {
                    types: [],
                    isFetching: false,
                    categoriesFetchingFailed: true,
                },
            },
        });

        nock.cleanAll();
    });
});
