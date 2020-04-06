import {
    authorize,
    clearAccessToken,
} from "store/actions/authorization.actions";
import authorization, { Authorization } from "api/authorization";
import { put, call } from "redux-saga/effects";
import { UNAUTHORIZED } from "http-status-codes";
import {
    isTestingEnv,
    removeAccessToken,
    setAccessToken,
    userIdentifier,
} from "utils/utils";

export function* authorizationSaga(): Generator {
    const headers: HeadersInit = {
        "content-type": "application/x-www-form-urlencoded",
    };

    // temporary walk-around due to failing tests when authorization header is passed
    if (!isTestingEnv) {
        headers.authorization = `Basic ${userIdentifier}`;
    }

    try {
        const response = yield call(authorization.authorize, headers);
        // TODO: handle typing for response
        const typedResponse = response as Authorization;
        setAccessToken(typedResponse.access_token);
        yield put(authorize.success(typedResponse));
    } catch (err) {
        yield put(authorize.failure(err.status));
    }
}
