import { prisma } from "../lib/prisma";

export function getAllBooks() {
    return prisma.book.findMany({ include: { author: true } });
}

export function findBookByTitle(title: string) {
    return prisma.book.findMany({
        where: { title: { contains: title, mode: "insensitive" } },
    });
}

export function getDueBooks(date: Date) {
    return prisma.borrow.findMany({
        where: {
            dueDate: date,
            returnedAt: null,
        },
        include: {
            book: true,
            member: true,
        },
    });}


