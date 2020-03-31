import createSagaMiddleware from "redux-saga";
import SagaTester from "redux-saga-tester";
import nock from "nock";
import types from "store/constants/categories.constants";
import expect from "expect";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "http-status-codes";
import {
    categoriesInitialState,
    categoriesReducer,
} from "store/reducers/categories.reducer";
import { nockHeaders } from "setupTests";
import API from "api/api";
import { fetchCategoriesSaga } from "./categories.saga";
import { fetchCategories } from "../actions/categories.actions";
import { categoriesFixture } from "../../fixtures/categories";
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
                categories: categoriesInitialState,
            },
            // eslint-disable-next-line
            reducers: categoriesReducer as any,
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchCategoriesSaga, { payload: 30 });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: categoriesInitialState,
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
            categories: categoriesFixture.categories.items,
            isFetching: false,
            categoriesFetchingFailed: false,
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
            .reply(BAD_REQUEST);

        const sagaTester = new SagaTester({
            initialState: {
                authorization: authorizationInitialState,
                categories: categoriesInitialState,
            },
            // eslint-disable-next-line
            reducers: categoriesReducer as any,
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(fetchCategoriesSaga, { payload: 30 });

        expect(sagaTester.getState()).toStrictEqual({
            authorization: authorizationInitialState,
            categories: categoriesInitialState,
        });

        sagaTester.dispatch(fetchCategories.request(30));
        await sagaTester.waitFor(types.FETCH_CATEGORIES_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.FETCH_CATEGORIES_FAILED,
        });

        expect(sagaTester.getState()).toStrictEqual({
            categories: [],
            isFetching: false,
            categoriesFetchingFailed: true,
        });

        nock.cleanAll();
    });
});
