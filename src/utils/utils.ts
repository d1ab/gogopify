export const isTestingEnv = process.env.NODE_ENV === "test";

export const userIdentifier = window.btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
);

export const accessToken = localStorage.getItem("accessToken");
