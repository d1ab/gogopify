import { createAction, createAsyncAction } from "typesafe-actions";
import playlistConstants from "store/constants/playlist.constants";
import { PlaylistTracks } from "api/playlist";

const {
    FETCH_PLAYLIST_REQUEST,
    FETCH_PLAYLIST_SUCCESS,
    FETCH_PLAYLIST_FAILED,
    UPDATE_TRACK,
    GO_TO_TRACK,
} = playlistConstants;

export const fetchPlaylist = createAsyncAction(
    FETCH_PLAYLIST_REQUEST,
    FETCH_PLAYLIST_SUCCESS,
    FETCH_PLAYLIST_FAILED
)<string, PlaylistTracks, number>();

export const updateTrack = createAction(UPDATE_TRACK)<{
    id: string;
    isPlaying: boolean;
}>();

/**
 * TODO: FIX https://github.com/piotrwitek/typesafe-actions/issues/143
 * empty action creator makes handleaAction retuning type never!
 */
export const go = createAction(GO_TO_TRACK)<{
    to: "next" | "previous";
}>();
