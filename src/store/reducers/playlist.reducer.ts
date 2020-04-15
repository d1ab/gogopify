import { ActionType, createReducer } from "typesafe-actions";
import * as playlistActions from "store/actions/playlist.actions";
import { AlbumTrack, Track } from "api/playlist";
import {
    fetchAlbumPlaylist,
    fetchPlaylist,
    go,
    updateTrack,
    updateWithFavourites,
} from "store/actions/playlist.actions";
import { UNAUTHORIZED } from "http-status-codes";

export const navigateTo = {
    next: "next",
    previous: "previous",
};

export type PlaylistAction = ActionType<typeof playlistActions>;

export type PlaylistState = Readonly<{
    items: Track[];
    isFetching: boolean;
    playlistFetchingFailed: boolean;
}>;

export const playlistInitialState: PlaylistState = {
    items: [],
    isFetching: false,
    playlistFetchingFailed: false,
};

const rerollTracks = (state: PlaylistState, selectedTrackId: string) => {
    return {
        ...state,
        items: state.items.map((item) => {
            const isSelected = item.track.id === selectedTrackId;

            return {
                ...item,
                isPlaying: isSelected,
                isActive: isSelected,
            };
        }),
    };
};

const assignAlbumTracks = (tracks: AlbumTrack[]) => {
    return tracks
        .filter((item) => {
            return item.preview_url;
        })
        .map((item) => ({
            track: item,
            isPlaying: false,
            isPaused: false,
            isActive: false,
        }));
};

const assignPlaylistTracks = (tracks: Track[]) => {
    return tracks
        .filter((item) => {
            return item.track && item.track.preview_url;
        })
        .map((item) => ({
            ...item,
            isPlaying: false,
            isPaused: false,
            isActive: false,
        }));
};

const isAlbum = (props: any): props is AlbumTrack[] => {
    return Array.isArray(props) && !props[0].track;
};

export const playlistReducer = createReducer<PlaylistState, PlaylistAction>(
    playlistInitialState
)
    .handleAction([fetchPlaylist.request, fetchAlbumPlaylist.request], () => {
        return {
            ...playlistInitialState,
            isFetching: true,
            playlistFetchingFailed: false,
        };
    })
    .handleAction(
        [fetchPlaylist.success, fetchAlbumPlaylist.success],
        (state, { payload }) => {
            return {
                ...state,
                isFetching: false,
                items: isAlbum(payload.items)
                    ? assignAlbumTracks(payload.items)
                    : assignPlaylistTracks(payload.items),
            };
        }
    )
    .handleAction(
        [fetchPlaylist.failure, fetchAlbumPlaylist.failure],
        (state, { payload: { status } }) => {
            return {
                ...state,
                isFetching: false,
                playlistFetchingFailed: status !== UNAUTHORIZED,
            };
        }
    )
    .handleAction(
        updateWithFavourites,
        (state, { payload: { favourites } }) => {
            return {
                ...state,
                items:
                    favourites.length === 0
                        ? favourites
                        : isAlbum(favourites)
                        ? assignAlbumTracks(favourites)
                        : assignPlaylistTracks(favourites),
            };
        }
    )
    .handleAction(updateTrack, (state, { payload }) => {
        return {
            ...state,
            items: state.items.map((item) => {
                const isActive = item.track.id === payload.id;

                return {
                    ...item,
                    isActive,
                    isPlaying: isActive ? payload.isPlaying : false,
                    isPaused: isActive ? !payload.isPlaying : false,
                };
            }),
        };
    })
    .handleAction(go, (state, { payload: { to } }) => {
        const currentTrackIndex = state.items.findIndex(
            ({ isActive }) => isActive
        );

        // leave untouched if track wont be found for some reasons
        if (currentTrackIndex === -1) {
            return state;
        }

        const tracklistLength = state.items.length;
        const newTrackIndex =
            to === navigateTo.next
                ? currentTrackIndex + 1
                : currentTrackIndex - 1;

        const isOutOfUpperRange = newTrackIndex > tracklistLength - 1;
        const isOutOfLowerRange = newTrackIndex < 0;

        // if track is last and user tries to play next
        if (isOutOfUpperRange) {
            const [firstTrack] = state.items;

            return rerollTracks(state, firstTrack.track.id);
        }

        // if track is fist and user tries to play previous
        if (isOutOfLowerRange) {
            const [lastTrack] = state.items.slice(-1);

            return rerollTracks(state, lastTrack.track.id);
        }

        const {
            track: { id },
        } = state.items[newTrackIndex];

        if (to === navigateTo.next) {
            return rerollTracks(state, id);
        }

        return rerollTracks(state, id);
    });
