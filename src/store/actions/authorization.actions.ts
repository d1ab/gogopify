import { createAction, createAsyncAction } from "typesafe-actions";
import { Authorization } from "api/authorization";
import authorizationConstants from "store/constants/authorization.constants";

const {
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILED,
    WRITE_ACCESS_TOKEN,
    CLEAR_ACCESS_TOKEN,
} = authorizationConstants;

export const authorize = createAsyncAction(
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILED
)<void, Authorization, number>();

export const writeAccessToken = createAction(WRITE_ACCESS_TOKEN)<{
    accessToken: string;
}>();

export const clearAccessToken = createAction(CLEAR_ACCESS_TOKEN)();
