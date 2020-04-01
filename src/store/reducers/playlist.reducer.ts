import {
    ActionType,
    createReducer,
    PayloadActionCreator,
} from "typesafe-actions";
import * as playlistActions from "store/actions/playlist.actions";
import { Tracks } from "api/playlist";
import { fetchPlaylist, go, updateTrack } from "store/actions/playlist.actions";

export const navigateTo = {
    next: "next",
    previous: "previous",
};

export type PlaylistAction = ActionType<typeof playlistActions>;

export type PlaylistState = Readonly<{
    items: Tracks[];
    image: string;
    name: string;
    isFetching: boolean;
    playlistFetchingFailed: boolean;
}>;

export const playlistInitialState: PlaylistState = {
    name: "",
    items: [],
    image: "",
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

export const playlistReducer = createReducer<PlaylistState, PlaylistAction>(
    playlistInitialState
)
    .handleAction(fetchPlaylist.request, () => {
        return {
            ...playlistInitialState,
            isFetching: true,
            playlistFetchingFailed: false,
        };
    })
    .handleAction(fetchPlaylist.success, (state, { payload }) => {
        return {
            ...state,
            isFetching: false,
            // TODO: name and image must be taken from categories
            name: "Unnamed",
            image:
                "https://i.scdn.co/image/b16064142fcd2bd318b08aab0b93b46e87b1ebf5",
            items: payload.items
                // TODO: probably this filtering can be done on API side
                .filter((item) => item.track !== null && item.track.preview_url)
                .map((item) => {
                    return {
                        ...item,
                        isPlaying: false,
                        isPaused: false,
                        isActive: false,
                    };
                }),
        };
    })
    .handleAction(fetchPlaylist.failure, (state) => {
        return {
            ...state,
            isFetching: false,
            playlistFetchingFailed: true,
        };
    })
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
