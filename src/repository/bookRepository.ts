import { prisma } from "../lib/prisma";

export function getAllBooks() {
    return prisma.book.findMany({
        include: { author: true }
    });
}

export function findBookByTitle(title: string) {
    return prisma.book.findMany({
        where: { title: { contains: title, mode: "insensitive" } }
    });
}

export function findBooksDueOn(date: Date) {
    return prisma.borrowRecord.findMany({
        where: { dueDate: date, returnedAt: null },
        include: { book: true, member: true }
    });
}
