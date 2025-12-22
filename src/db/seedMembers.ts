import { prisma } from "../lib/prisma";

export async function seedMembers() {
    const member = await prisma.member.create({
        data: {
            memberCode: "M001",
            firstName: "Alice",
            lastName: "Smith",
            phone: "0812345678"
        }
    });

    const book = await prisma.book.findFirst();

    if (book) {
        await prisma.borrowRecord.create({
            data: {
                bookId: book.id,
                memberId: member.id,
                dueDate: new Date("2025-01-31")
            }
        });
    }
}
