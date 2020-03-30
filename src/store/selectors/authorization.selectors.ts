import { AppState } from "store/rootReducer";
import { createSelector } from "reselect";

const authorizationState = (state: AppState) => state.authorization;

export const getAuthProcessingState = createSelector(
    authorizationState,
    ({ isAuthorizing }) => isAuthorizing
);

export const getAuthorizationState = createSelector(
    authorizationState,
    ({ isAuthorized }) => isAuthorized
);

export const getAuthorizationFailedState = createSelector(
    authorizationState,
    ({ authorizationFailed }) => authorizationFailed
);
