import { put, select, call, delay } from "redux-saga/effects";
import { NOT_FOUND } from "http-status-codes";
import { fetchPlaylist } from "store/actions/playlist.actions";
import { getTrackById } from "store/selectors/playlist.selectors";
import { addToFavourites, resetFavouritesStatus } from "store/actions/favourites.actions";
import { addNewFavourite } from "utils/utils";
import { Track } from "api/playlist";

export function* addToFavouritesSaga(
    action: ReturnType<typeof addToFavourites.request>
): Generator {
    try {
        const track = yield select(getTrackById(action.payload.trackId));
        // just to simulate some async delay
        yield delay(500);

        if (!track) {
            yield put(addToFavourites.failure({ status: NOT_FOUND }));
        }

        yield put(addToFavourites.success(track as Track));
        yield put(resetFavouritesStatus());
        addNewFavourite(track as Track);
    } catch (err) {
        yield put(fetchPlaylist.failure({ status: err.status }));
    }
}
