import { createAction, createAsyncAction } from "typesafe-actions";
import playlistConstants from "store/constants/playlist.constants";
import { PlaylistTracks } from "api/playlist";

const {
    FETCH_PLAYLIST_REQUEST,
    FETCH_PLAYLIST_SUCCESS,
    FETCH_PLAYLIST_FAILED,
    UPDATE_TRACK,
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
