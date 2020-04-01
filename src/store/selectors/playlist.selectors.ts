import { AppState } from "store/rootReducer";
import { createSelector } from "reselect";
import { Tracks } from "../../api/playlist";

const playlistState = ({ playlist }: AppState) => playlist;

export const getPlaylistInfo = createSelector(
    playlistState,
    ({ name, image }) => ({ name, image })
);

export const getTracks = createSelector(playlistState, ({ items }) =>
    // TODO: probably this filtering should be done on API site
    items.filter(({ track }) => track.preview_url !== null)
);

export const getPlaylistProcessingStatus = createSelector(
    playlistState,
    ({ isFetching, playlistFetchingFailed }) => ({
        isFetching,
        playlistFetchingFailed,
    })
);

export const checkActiveItemById = (id: string) =>
    createSelector(playlistState, ({ items }) =>
        items.some(({ track, isActive }) => track.id === id && isActive)
    );

export const getActiveTrack = createSelector(playlistState, ({ items }) => {
    const activeTrack = items.find(({ isActive }) => isActive);

    return activeTrack
        ? activeTrack
        : ({
              isActive: false,
              isPlaying: false,
              isPaused: false,
              track: {},
          } as Tracks);
});
