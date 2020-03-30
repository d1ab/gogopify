import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "store/actions/authorization.actions";
import { authorize } from "store/actions/authorization.actions";
export type AuthorizationAction = ActionType<typeof actions>;

export type AuthorizationState = Readonly<{
    isAuthorized: boolean;
    isAuthorizing: boolean;
    authorizationFailed: boolean;
    token: string | null;
}>;

export const authorizationInitialState: AuthorizationState = {
    isAuthorized: false,
    isAuthorizing: false,
    authorizationFailed: false,
    token: null,
};

export const authorizationReducer = createReducer<
    AuthorizationState,
    AuthorizationAction
>(authorizationInitialState)
    .handleAction(authorize.request, () => {
        return {
            ...authorizationInitialState,
            isAuthorizing: true,
        };
    })
    .handleAction(authorize.success, (state, action) => {
        return {
            ...state,
            isAuthorizing: false,
            isAuthorized: true,
            token: action.payload.access_token,
        };
    })
    .handleAction(authorize.failure, (state) => {
        return {
            ...state,
            authorizationFailed: true,
            isAuthorizing: false,
        };
    });
