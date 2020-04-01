import { ActionType, createReducer } from "typesafe-actions";
import * as playlistActions from "store/actions/playlist.actions";
import { Tracks } from "api/playlist";
import { fetchPlaylist, updateTrack } from "store/actions/playlist.actions";

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
            items: payload.items.map((item) => {
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
    });
