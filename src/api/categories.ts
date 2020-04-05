import API, { get } from "./api";
import { Artist } from "./playlist";

interface PlaylistsDecorator {
    artists?: Artist[];
}

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

export interface Playlist extends PlaylistsDecorator {
    images: CategoryImage[];
    id: string;
    name: string;
    description: string;
    href: string;
    type: "playlist" | "album";
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
    playlists: PlaylistProperties;
}

export interface PlaylistProperties {
    items: Playlist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
};

const fetchCategories = (
    limit: number,
    headers?: HeadersInit
): Promise<Categories | undefined> => {
    return get<Categories>(
        `${API.baseApiUrl}/browse/categories?limit=${limit}`,
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

const fetchFeaturedPlaylists = (
    headers?: HeadersInit
): Promise<Playlists | undefined> => {
    return get<Playlists | undefined>(
        `${API.baseApiUrl}/browse/featured-playlists`,
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

const fetchPlaylists = (
    categoryId: string,
    headers?: HeadersInit
): Promise<Playlists | undefined> => {
    return get<Playlists>(
        `${API.baseApiUrl}/browse/categories/${categoryId}/playlists`,
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

export default {
    fetchCategories,
    fetchFeaturedPlaylists,
    fetchPlaylists,
};
