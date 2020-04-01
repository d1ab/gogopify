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

export interface Tracks extends TrackPlayerDecrator {
    // track can be null
    track: Track;
}

interface Track {
    id: string;
    name: string;
    // track can be null
    preview_url: string;
    album: Album;
}

interface Artist {
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

export default {
    fetchPlaylist,
};
