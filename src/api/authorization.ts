import API, { postAuth } from "api/api";

export interface Authorization {
    access_token: string;
    token_type: string;
    expires_in: number;
}

const authorize = (): Promise<Authorization | undefined> => {
    return postAuth<Authorization>(`${API.baseAuthUrl}/token`).then(
        ({ parsedBody }) => parsedBody
    );
};

export default {
    authorize,
};
