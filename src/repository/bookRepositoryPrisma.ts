import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function findBooksWithPagination(
    keyword: string,
    pageSize: number,
    pageNo: number
) {
    const where: Prisma.BookWhereInput = {
        OR: [
            {
                title: {
                    contains: keyword,
                    mode: Prisma.QueryMode.insensitive,
                },
            },
            {
                category: {
                    contains: keyword,
                    mode: Prisma.QueryMode.insensitive,
                },
            },
            {
                author: {
                    OR: [
                        {
                            firstName: {
                                contains: keyword,
                                mode: Prisma.QueryMode.insensitive,
                            },
                        },
                        {
                            lastName: {
                                contains: keyword,
                                mode: Prisma.QueryMode.insensitive,
                            },
                        },
                    ],
                },
            },
            {
                borrows: {
                    some: {
                        member: {
                            OR: [
                                {
                                    firstName: {
                                        contains: keyword,
                                        mode: Prisma.QueryMode.insensitive,
                                    },
                                },
                                {
                                    lastName: {
                                        contains: keyword,
                                        mode: Prisma.QueryMode.insensitive,
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        ],
    };

    const books = await prisma.book.findMany({
        where,
        skip: pageSize * (pageNo - 1),
        take: pageSize,
        select: {
            id: true,
            title: true,
            category: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    const count = await prisma.book.count({ where });

    return { count, books };
}

