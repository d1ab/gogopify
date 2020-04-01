import API, { get } from "./api";

export interface Category {
    id: string;
    name: string;
    href: string;
    icons: CategoryImage[];
}

export interface CategoryImage {
    height: number;
    url: string;
    width: number;
}

export interface CategoryPlaylist {
    images: CategoryImage[];
    id: string;
    name: string;
    description: string;
    href: string;
}

export interface Categories {
    categories: {
        items: Category[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
}

export interface Playlists {
    items: CategoryPlaylist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface CategoryPlaylists {
    playlists: Playlists;
}

export interface NewReleases {
    playlists: Playlists;
}

const fetchCategories = (
    limit: number,
    headers?: HeadersInit
): Promise<Categories | undefined> => {
    return get<Categories>(
        `${API.baseApiUrl}/browse/categories?limit=${limit}`,
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

// TODO: FIX CategoryPlaylists and NewReleases share similar properties
const fetchFeaturedPlaylists = (
    headers?: HeadersInit
): Promise<CategoryPlaylists | undefined> => {
    return get<NewReleases | undefined>(
        `${API.baseApiUrl}/browse/featured-playlists`,
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

const fetchCategoryPlaylists = (
    categoryId: string,
    headers?: HeadersInit
): Promise<CategoryPlaylists | undefined> => {
    return get<CategoryPlaylists>(
        `${API.baseApiUrl}/browse/categories/${categoryId}/playlists`,
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

export default {
    fetchCategories,
    fetchFeaturedPlaylists,
    fetchCategoryPlaylists,
};
