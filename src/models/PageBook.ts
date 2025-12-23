import type { BookListItem } from "./Book"

export interface PageBook<T = any> {
    count: number;
    books: T[];
}
