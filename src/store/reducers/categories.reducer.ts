import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "store/actions/categories.actions";
import { Category } from "../../api/categories";
import { fetchCategories } from "store/actions/categories.actions";

export type CategoriesAction = ActionType<typeof actions>;

export type CategoriesState = Readonly<{
    categories: Category[];
    isFetching: boolean;
    categoriesFetchingFailed: boolean;
}>;

export const categoriesInitialState: CategoriesState = {
    categories: [],
    isFetching: false,
    categoriesFetchingFailed: false,
};

export const categoriesReducer = createReducer<
    CategoriesState,
    CategoriesAction
>(categoriesInitialState)
    .handleAction(fetchCategories.request, () => {
        return {
            ...categoriesInitialState,
            isFetching: true,
        };
    })
    .handleAction(
        fetchCategories.success,
        (state, { payload: { categories } }) => {
            return {
                ...state,
                isFetching: false,
                categories: categories.items,
            };
        }
    )
    .handleAction(fetchCategories.failure, (state) => {
        return {
            ...state,
            isFetching: false,
            categoriesFetchingFailed: true,
        };
    });
