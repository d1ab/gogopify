import { createAsyncAction } from "typesafe-actions";
import { CategoryPlaylists } from "api/categories";
import categoryPlaylistsConstants from "store/constants/categoryPlaylists.constants";

const {
    FETCH_CATEGORY_PLAYLISTS_REQUEST,
    FETCH_CATEGORY_PLAYLISTS_SUCCESS,
    FETCH_CATEGORY_PLAYLISTS_FAILED,
} = categoryPlaylistsConstants;

export const fetchCategoryPlaylists = createAsyncAction(
    FETCH_CATEGORY_PLAYLISTS_REQUEST,
    FETCH_CATEGORY_PLAYLISTS_SUCCESS,
    FETCH_CATEGORY_PLAYLISTS_FAILED
)<string, CategoryPlaylists, Error>();
