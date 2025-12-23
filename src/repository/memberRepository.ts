import { prisma } from "../lib/prisma";

export function getAllMembers() {
    return prisma.member.findMany();
}

export function getMemberById(id: number) {
    return prisma.member.findUnique({
        where: { id },
        include: {
            borrows: {
                include: {
                    book: true,
                },
            },
        },
    });
}

export function findMemberByCode(memberCode: string) {
    return prisma.member.findUnique({
        where: { memberCode },
    });
}
