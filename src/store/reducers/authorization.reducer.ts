import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "store/actions/authorization.actions";
import {
    authorize,
    clearAccessToken,
    writeAccessToken,
} from "store/actions/authorization.actions";
import { getAccessToken } from "../../utils/utils";

export type AuthorizationAction = ActionType<typeof actions>;

export type AuthorizationState = Readonly<{
    isAuthorized: boolean;
    isAuthorizing: boolean;
    authorizationFailed: boolean;
    isTokenExpired: boolean;
    token: string | null;
}>;

const accessToken = getAccessToken();

export const authorizationInitialState: AuthorizationState = {
    isAuthorized: !!accessToken,
    isAuthorizing: false,
    authorizationFailed: false,
    isTokenExpired: false,
    token: accessToken,
};

export const authorizationReducer = createReducer<
    AuthorizationState,
    AuthorizationAction
>(authorizationInitialState)
    .handleAction(authorize.request, () => {
        return {
            ...authorizationInitialState,
            isAuthorized: false,
            isAuthorizing: true,
            token: null,
        };
    })
    .handleAction(authorize.success, (state, action) => {
        return {
            ...state,
            isAuthorizing: false,
            isAuthorized: true,
            isTokenExpired: false,
            token: action.payload.access_token,
        };
    })
    .handleAction(authorize.failure, (state) => {
        return {
            ...state,
            authorizationFailed: true,
            isAuthorizing: false,
        };
    })
    .handleAction(writeAccessToken, (state, action) => {
        return {
            ...state,
            isAuthorized: true,
            token: action.payload.accessToken,
        };
    })
    .handleAction(clearAccessToken, (state) => {
        return {
            ...state,
            isAuthorized: false,
            isTokenExpired: true,
            token: null,
        };
    });
