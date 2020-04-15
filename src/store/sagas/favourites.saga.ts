import { put, select } from "redux-saga/effects";
import { NOT_FOUND } from "http-status-codes";
import { fetchPlaylist } from "store/actions/playlist.actions";
import { getTrackById } from "store/selectors/playlist.selectors";
import { addToFavourites } from "store/actions/favourites.actions";
import { addNewFavourite } from "utils/utils";
import { Track } from "api/playlist";

export function* addToFavouritesSaga(
    action: ReturnType<typeof addToFavourites.request>
): Generator {
    try {
        const track = yield select(getTrackById(action.payload.trackId));

        if (!track) {
            yield put(addToFavourites.failure({ status: NOT_FOUND }));
        }

        yield put(addToFavourites.success(track as Track));
        addNewFavourite(track as Track);
    } catch (err) {
        yield put(fetchPlaylist.failure({ status: err.status }));
    }
}
