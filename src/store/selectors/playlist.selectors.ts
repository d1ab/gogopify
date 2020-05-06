import { AppState } from "store/rootReducer";
import { createSelector } from "reselect";
import { Track } from "api/playlist";

const playlistState = ({ playlist }: AppState) => playlist;

export const getPlaylistProcessingStatus = createSelector(
    playlistState,
    ({ isFetching, playlistFetchingFailed, items }) => ({
        isFetching,
        playlistFetchingFailed,
        items,
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

    return {
        activeTrack: activeTrack
            ? activeTrack
            : ({
                  isActive: false,
                  isPlaying: false,
                  isPaused: false,
                  track: {},
              } as Track),
    };
});

export const getTrackById = (id: string) =>
    createSelector(playlistState, ({ items }) => {
        return items.find(({ track }) => track.id === id);
    });
