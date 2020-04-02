import { AppState } from "store/rootReducer";
import { createSelector } from "reselect";

const authorizationState = (state: AppState) => state.authorization;

export const getAuthProcessingState = createSelector(
    authorizationState,
    ({ isAuthorizing }) => isAuthorizing
);

export const getAuthorizationState = createSelector(
    authorizationState,
    (state) => state
);

export const getAuthorizationFailedState = createSelector(
    authorizationState,
    ({ authorizationFailed }) => authorizationFailed
);

export const getAuthorizationAccessToken = createSelector(
    authorizationState,
    ({ token }) => token
);

export const getAuthorizationExpirationState = createSelector(
    authorizationState,
    ({ isTokenExpired }) => isTokenExpired
);
