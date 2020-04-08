import { PlaylistProperties, Playlists } from "./categories";
import API, { get } from "./api";

export interface Albums {
    albums: PlaylistProperties;
}

const fetchNewReleases = (
    headers?: HeadersInit
): Promise<Playlists | undefined> => {
    return get<Albums>(`${API.baseApiUrl}/browse/new-releases`, {
        headers,
    }).then(({ parsedBody }) => ({
        playlists: parsedBody!.albums,
    }));
};

export default {
    fetchNewReleases,
};
