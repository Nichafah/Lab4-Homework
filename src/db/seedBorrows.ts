import { prisma } from "../lib/prisma";

export async function seedBorrows(members: any[]) {
    const book = await prisma.book.findFirst();
    if (!book) return;

    await prisma.borrow.create({
        data: { bookId: book.id, memberId: members[0].id, dueDate: new Date("2025-01-10"), returnedAt: null },
    });
}



