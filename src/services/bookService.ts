import * as repo from "../repository/bookRepositoryPrisma";

export function getBooksWithPagination(
    keyword: string,
    pageSize: number,
    pageNo: number
) {
    return repo.getBooksWithPagination(keyword, pageSize, pageNo);
}
