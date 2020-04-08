import { createAsyncAction } from "typesafe-actions";
import { Playlists } from "api/categories";
import featuredPlaylistsConstants from "store/constants/featuredPlaylists.constants";

const {
    FETCH_FEATURED_PLAYLISTS_REQUEST,
    FETCH_FEATURED_PLAYLISTS_SUCCESS,
    FETCH_FEATURED_PLAYLISTS_FAILED,
} = featuredPlaylistsConstants;

export const fetchFeaturedPlaylists = createAsyncAction(
    FETCH_FEATURED_PLAYLISTS_REQUEST,
    FETCH_FEATURED_PLAYLISTS_SUCCESS,
    FETCH_FEATURED_PLAYLISTS_FAILED
)<string, Playlists, { status: number }>();
