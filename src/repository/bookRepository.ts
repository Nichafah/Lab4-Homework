import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function findBooksWithPagination(
    keyword: string,
    pageSize: number,
    pageNo: number
) {
    const where: Prisma.BookWhereInput = {
        OR: [
            // ชื่อหนังสือ
            {
                title: {
                    contains: keyword,
                    mode: Prisma.QueryMode.insensitive,
                },
            },

            // หมวดหนังสือ
            {
                category: {
                    contains: keyword,
                    mode: Prisma.QueryMode.insensitive,
                },
            },

            // ชื่อผู้แต่ง
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

            // ชื่อสมาชิกที่เคยยืม
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



