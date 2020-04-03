import { createAsyncAction } from "typesafe-actions";
import { Categories } from "api/categories";
import categoriesConstants from "store/constants/categories.constants";

const {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILED,
    FETCH_CATEGORIES_SUCCESS,
} = categoriesConstants;

export const fetchCategories = createAsyncAction(
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILED
)<number, Categories, Error>();
