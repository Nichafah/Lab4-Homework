import * as repo from "../repository/bookRepositoryPrisma";

export function searchBooks(
    keyword: string,
    pageSize: number,
    pageNo: number
) {
    return repo.findBooksWithPagination(keyword, pageSize, pageNo);
}
