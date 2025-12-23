import * as repo from "../repository/bookRepository";

export function getAllBooks() {
    return repo.getAllBooks();
}

export function searchBook(title: string) {
    return repo.findBookByTitle(title);
}

export function getDueBooks(date: Date) {
    return repo.getDueBooks(date);
}
