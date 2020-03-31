import { isPlainObject } from "utils/utils";

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
    args?: RequestInit
): Promise<HttpResponse<T>> {
    const defaultHeaders = {
        method: "POST",
        body: isPlainObject(body) ? JSON.stringify(body) : body,
    };

    return await http<T>(new Request(path, { ...args, ...defaultHeaders }));
}

export async function get<T>(
    path: string,
    args?: RequestInit
): Promise<HttpResponse<T>> {
    const defaultHeaders = {
        method: "GET",
    };

    return await http<T>(new Request(path, { ...args, ...defaultHeaders }));
}

export default {
    baseAuthUrl: process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL,
    baseApiUrl: process.env.REACT_APP_SPOTIFY_API_URL,
};
