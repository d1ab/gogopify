import API, { post } from "api/api";
import { userIdentifier } from "../utils/utils";

export interface Authorization {
    access_token: string;
    token_type: string;
    expires_in: number;
}

const authorize = (
    headers: HeadersInit
): Promise<Authorization | undefined> => {
    return post<Authorization>(
        `${API.baseAuthUrl}/token`,
        "grant_type=client_credentials",
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

export default {
    authorize,
};
