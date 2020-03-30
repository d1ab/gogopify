import { createAsyncAction } from "typesafe-actions";
import { Categories } from "api/categories";
import categoriesConstants from "store/constants/categories.constants";

export const fetchCategories = createAsyncAction(
    categoriesConstants.FETCH_CATEGORIES_REQUEST,
    categoriesConstants.FETCH_CATEGORIES_SUCCESS,
    categoriesConstants.FETCH_CATEGORIES_FAILED
)<{ limit?: number }, Categories, number>();
