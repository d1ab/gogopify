import { ActionType, createReducer } from "typesafe-actions";
import * as favouritesActions from "store/actions/favourites.actions";
import { Track } from "api/playlist";
import { getFavourites } from "utils/utils";
import {
    addToFavourites,
    resetFavouritesStatus,
} from "store/actions/favourites.actions";
export type FavouritesAction = ActionType<typeof favouritesActions>;

export type FavouritesState = Readonly<{
    items: Track[];
    isAdding: boolean;
    isSuccess: boolean;
}>;

export const favouritesInitialState: FavouritesState = {
    isAdding: false,
    isSuccess: false,
    items: getFavourites(),
};

export const favouritesReducer = createReducer<
    FavouritesState,
    FavouritesAction
>(favouritesInitialState)
    .handleAction(addToFavourites.request, (state) => {
        return {
            ...state,
            isSuccess: false,
            isAdding: true,
        };
    })
    .handleAction(addToFavourites.success, (state, action) => {
        return {
            ...state,
            isAdding: false,
            isSuccess: true,
            items: [...state.items, action.payload],
        };
    })
    .handleAction(resetFavouritesStatus, (state) => {
        return {
            ...favouritesInitialState,
            items: state.items,
        };
    });
