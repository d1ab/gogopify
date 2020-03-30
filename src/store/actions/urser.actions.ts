import { createAsyncAction } from "typesafe-actions";

export const authorizeUser = createAsyncAction(
    "LOG_IN_USER_REQUEST",
    "LOG_IN_USER_SUCCESS",
    "LOG_IN_USER_FAILURE"
)<void, void, Error>();
