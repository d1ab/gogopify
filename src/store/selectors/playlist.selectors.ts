import { AppState } from "store/rootReducer";
import { createSelector } from "reselect";
import { Tracks } from "../../api/playlist";

const playlistState = ({ playlist }: AppState) => playlist;

export const getTracks = createSelector(playlistState, ({ items }) => items);

export const getPlaylistProcessingStatus = createSelector(
    playlistState,
    ({ isFetching, playlistFetchingFailed }) => ({
        isFetching,
        playlistFetchingFailed,
    })
);

export const checkActiveItemById = (id: string) =>
    createSelector(playlistState, ({ items }) => {
        const activeTrack = items.find(
            ({ track, isActive }) => track.id === id && isActive
        );

        return activeTrack
            ? { isPlaying: activeTrack.isPlaying, isActive: true }
            : { isPlaying: false, isActive: false };
    });

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