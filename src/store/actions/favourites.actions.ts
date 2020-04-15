import { createAsyncAction } from "typesafe-actions";
import favouritesConstants from "store/constants/favourites.constants";
import { Track } from "api/playlist";

const {
    ADD_TO_FAVOURITES_REQUEST,
    ADD_TO_FAVOURITES_SUCCESS,
    ADD_TO_FAVOURITES_FAILED,
} = favouritesConstants;

export const addToFavourites = createAsyncAction(
    ADD_TO_FAVOURITES_REQUEST,
    ADD_TO_FAVOURITES_SUCCESS,
    ADD_TO_FAVOURITES_FAILED
)<{ trackId: string }, Track, { status: number }>();
