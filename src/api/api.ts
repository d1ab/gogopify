import { getAccessToken, isTestingEnv, userIdentifier } from "utils/utils";

export interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export const http = <T>(
    request: RequestInfo,
    init?: RequestInit
): Promise<HttpResponse<T>> => {
    return new Promise((resolve, reject) => {
        let response: HttpResponse<T>;
        fetch(request, init)
            .then((res) => {
                response = res;
                return res.json();
            })
            .then((body) => {
                if (response.ok) {
                    response.parsedBody = body;
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export async function post<T>(
    path: string,
    // eslint-disable-next-line
    body: any,
    args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
}

export async function get<T>(
    path: string,
    args: RequestInit = {
        method: "get",
        headers: {
            Authorization: getAccessToken() || "",
        },
    }
): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
}

export async function postAuth<T>(
    path: string,
    // eslint-disable-next-line
    args: RequestInit = {
        method: "post",
        body: "grant_type=client_credentials",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }
): Promise<HttpResponse<T>> {
    // TODO: temporary walk-around - nock doesn't want to cooperate with authorization header
    const headers = isTestingEnv
        ? { ...args.headers }
        : {
              ...args.headers,
              Authorization: `Basic ${userIdentifier}`,
          };

    return await http<T>(
        new Request(path, {
            ...args,
            headers,
        })
    );
}

export default {
    baseAuthUrl: process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL,
    baseApiUrl: process.env.REACT_APP_SPOTIFY_API_URL,
};
