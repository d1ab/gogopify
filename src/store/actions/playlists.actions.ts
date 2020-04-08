import { createAsyncAction } from "typesafe-actions";
import { Playlists } from "api/categories";
import playlistsConstants from "store/constants/playlists.constants";

const {
    FETCH_PLAYLISTS_REQUEST,
    FETCH_PLAYLISTS_SUCCESS,
    FETCH_PLAYLISTS_FAILED,
} = playlistsConstants;

export const fetchPlaylists = createAsyncAction(
    FETCH_PLAYLISTS_REQUEST,
    FETCH_PLAYLISTS_SUCCESS,
    FETCH_PLAYLISTS_FAILED
)<string, Playlists, { status: number }>();
