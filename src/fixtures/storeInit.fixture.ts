export const storeInitFixture = {
    router: {
        location: {
            pathname: "/",
            search: "",
            hash: "",
            key: "1wvnb1",
            query: {},
        },
        action: "POP",
    },
    authorization: {
        isAuthorized: false,
        isAuthorizing: false,
        authorizationFailed: false,
        isTokenExpired: false,
        token: null,
    },
    categories: {
        mainCategories: {
            types: [],
            isFetching: false,
            categoriesFetchingFailed: false,
        },
        playlists: {
            playlists: [],
            isFetching: false,
            categoriesPlaylistsFetchingFailed: false,
        },
    },
    playlist: {
        items: [],
        isFetching: false,
        playlistFetchingFailed: false,
    },
};
