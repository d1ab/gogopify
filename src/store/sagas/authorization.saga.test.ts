import createSagaMiddleware from "redux-saga";
import SagaTester from "redux-saga-tester";
import nock from "nock";
import types from "store/constants/authorization.constants";
import expect from "expect";
import { BAD_REQUEST, OK } from "http-status-codes";
import {
    authorizationInitialState,
    authorizationReducer,
} from "../reducers/authorization.reducer";
import { authorizationSaga } from "store/sagas/authorization.saga";
import { authorize } from "store/actions/authorization.actions";
import { nockHeaders } from "setupTests";
import { ACCESS_TOKEN_KEY } from "../../utils/utils";

const sagaMiddleware = createSagaMiddleware();

describe("authorizationSaga", () => {
    it("creates 'AUTHORIZATION_SUCCESS' when user authorization has been done", async () => {
        nock(process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL!)
            .defaultReplyHeaders(nockHeaders)
            .post("/token", {
                grant_type: "client_credentials",
            })
            .reply(OK, {
                access_token: "sampleToken",
                token_type: "bearer",
                expires_in: 3600,
            });

        const sagaTester = new SagaTester({
            initialState: authorizationInitialState,
            // eslint-disable-next-line
            reducers: authorizationReducer as any,
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(authorizationSaga);

        expect(sagaTester.getState()).toStrictEqual(authorizationInitialState);
        sagaTester.dispatch(authorize.request());
        await sagaTester.waitFor(types.AUTHORIZE_SUCCESS);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.AUTHORIZE_SUCCESS,
            payload: {
                access_token: "sampleToken",
                token_type: "bearer",
                expires_in: 3600,
            },
        });
        expect(localStorage.__STORE__[ACCESS_TOKEN_KEY]).toBe("sampleToken");
        expect(sagaTester.getState()).toStrictEqual({
            isAuthorized: true,
            isAuthorizing: false,
            authorizationFailed: false,
            isTokenExpired: false,
            token: "sampleToken",
        });

        nock.cleanAll();
    });

    it("creates 'AUTHORIZATION_FAILED' when user authorization failed", async () => {
        nock(process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL!, {
            allowUnmocked: true,
        })
            .defaultReplyHeaders(nockHeaders)
            .post("/token", {
                grant_type: "client_credentials",
            })
            .reply(BAD_REQUEST);

        const sagaTester = new SagaTester({
            initialState: authorizationInitialState,
            // eslint-disable-next-line
            reducers: authorizationReducer as any,
            middlewares: [sagaMiddleware],
        });
        sagaTester.start(authorizationSaga);

        expect(sagaTester.getState()).toStrictEqual(authorizationInitialState);

        sagaTester.dispatch(authorize.request());
        await sagaTester.waitFor(types.AUTHORIZE_FAILED);

        expect(sagaTester.getLatestCalledAction()).toStrictEqual({
            type: types.AUTHORIZE_FAILED,
        });

        expect(sagaTester.getState()).toStrictEqual({
            isAuthorized: false,
            isAuthorizing: false,
            authorizationFailed: true,
            isTokenExpired: false,
            token: null,
        });

        nock.cleanAll();
    });
});
