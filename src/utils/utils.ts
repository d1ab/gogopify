import { Track } from "api/playlist";

export const ACCESS_TOKEN_KEY = "accessToken";

export const isTestingEnv = process.env.NODE_ENV === "test";

export const userIdentifier = window.btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const removeAccessToken = () =>
    localStorage.removeItem(ACCESS_TOKEN_KEY);

export const setAccessToken = (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

export const isPlainObject = (obj: any): boolean => {
    return Object.prototype.toString.call(obj) === "[object Object]";
};

export const addNewFavourite = (track: Track) => {
    const storedFavourites = localStorage.getItem("favourites");
    const favourites: Track[] = storedFavourites
        ? JSON.parse(storedFavourites)
        : [];

    favourites.push(track);

    localStorage.setItem("favourites", JSON.stringify(favourites));
};

export const getFavourites = () => {
    const favourites = localStorage.getItem("favourites");

    return favourites ? (JSON.parse(favourites) as Track[]) : [];
};
