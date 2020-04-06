import { CategoryImage } from "./categories";
import API, { get } from "./api";

export interface TrackPlayerDecrator {
    isPlaying: boolean;
    isPaused: boolean;
    isActive: boolean;
}

export interface PlaylistTracks {
    items: Tracks[];
    limit: number;
    next: null | null;
    offset: number;
    previous: number | null;
    total: number;
}

export interface AlbumPlaylistTracks {
    items: AlbumTracks[];
    limit: number;
    next: null | null;
    offset: number;
    previous: number | null;
    total: number;
}

export interface Tracks extends TrackPlayerDecrator {
    // track can be null?
    track: AlbumTracks;
}

export interface AlbumTracks {
    id: string;
    name: string;
    preview_url: string;
    album?: Album;
    artists: Artist[];
}

export interface Artist {
    id: string;
    name: string;
}

interface Album {
    id: string;
    artists: Artist[];
    images: CategoryImage[];
}

const fetchPlaylist = (
    playlistId: string,
    headers?: HeadersInit
): Promise<PlaylistTracks | undefined> => {
    return get<PlaylistTracks>(
        `${API.baseApiUrl}/playlists/${playlistId}/tracks?offset=0&limit=100`,
        {
            headers,
        }
    ).then(({ parsedBody }) => parsedBody);
};

const fetchAlbumPlaylist = (
    playlistId: string,
    headers?: HeadersInit
): Promise<AlbumPlaylistTracks | undefined> => {
    return get<AlbumPlaylistTracks>(
        `${API.baseApiUrl}/albums/${playlistId}/tracks`,
        {
            headers,
        }
    ).then(({ parsedBody }) => parsedBody);
};

export default {
    fetchPlaylist,
    fetchAlbumPlaylist,
};
