import API, { get } from "./api";
import { getAccessToken } from "utils/utils";

export interface Categories {
    categories: {
        href: string;
        items: Category[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
}

export interface Category {
    id: string;
    name: string;
    href: string;
    icons: CategoryIcon[];
}

export interface CategoryIcon {
    height: number;
    url: string;
    width: number;
}

const fetchCategories = (
    limit: number,
    headers?: HeadersInit
): Promise<Categories | undefined> => {
    return get<Categories>(
        `${API.baseApiUrl}/browse/categories?limit=${limit}`,
        { headers }
    ).then(({ parsedBody }) => parsedBody);
};

export default {
    fetchCategories,
};
