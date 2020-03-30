export interface Categories {
    href: string;
    items: Category[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
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
