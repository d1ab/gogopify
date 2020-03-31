import { AppState } from "store/rootReducer";
import { createSelector } from "reselect";

const categoriesState = (state: AppState) => state.categories;

export const getCategoriesProperties = createSelector(
    categoriesState,
    ({ categories, isFetching, categoriesFetchingFailed }) => ({
        categories,
        isFetching,
        categoriesFetchingFailed,
    })
);
