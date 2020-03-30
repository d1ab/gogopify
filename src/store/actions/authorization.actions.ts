import { createAsyncAction, createAction } from "typesafe-actions";
import { deprecated } from "typesafe-actions";
import { Authorization } from "api/authorization";
import authorizationConstants from "store/constants/authorization.constants";

const { createStandardAction } = deprecated;

const {
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILED,
    WRITE_ACCESS_TOKEN,
} = authorizationConstants;

export const authorize = createAsyncAction(
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILED
)<void, Authorization, number>();

// export const writeAccessToken = createAction<string, { accessToken: string }>(
//     WRITE_ACCESS_TOKEN,
//     (action) => {
//         return (accessToken: string) => action(accessToken);
//     }
// );

export const writeAccessToken = createStandardAction(WRITE_ACCESS_TOKEN)<{
    accessToken: string;
}>();
