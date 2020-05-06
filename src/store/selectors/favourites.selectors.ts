import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const favouritesState = ({ favourites }: AppState) => favourites;

export const getAllFavourites = createSelector(
    favouritesState,
    ({ items }) => items
);

export const getFavouritesStatus = createSelector(
    favouritesState,
    ({ isAdding, isSuccess }) => ({ isAdding, isSuccess })
);

export const getFavouriteById = (id: string) =>
    createSelector(favouritesState, ({ items }) => {
        return items.find(({ track }) => track.id === id);
    });
