import { createAsyncAction } from "typesafe-actions";
import { Playlists } from "api/categories";
import newReleasesConstants from "store/constants/albums.constants";

const {
    FETCH_NEW_RELEASES_REQUEST,
    FETCH_NEW_RELEASES_SUCCESS,
    FETCH_NEW_RELEASES_FAILED,
} = newReleasesConstants;

export const fetchNewReleases = createAsyncAction(
    FETCH_NEW_RELEASES_REQUEST,
    FETCH_NEW_RELEASES_SUCCESS,
    FETCH_NEW_RELEASES_FAILED
)<string, Playlists, { status: number }>();
