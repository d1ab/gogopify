import { createAsyncAction } from "typesafe-actions";
import { Authorization } from "api/authorization";
import authorizationConstants from "store/constants/authorization.constants";

export const authorize = createAsyncAction(
    authorizationConstants.AUTHORIZE_REQUEST,
    authorizationConstants.AUTHORIZE_SUCCESS,
    authorizationConstants.AUTHORIZE_FAILED
)<void, Authorization, number>();
