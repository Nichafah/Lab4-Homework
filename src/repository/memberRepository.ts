import { prisma } from "../lib/prisma";

export function findMemberByName(name: string) {
    return prisma.member.findMany({
        where: {
            firstName: { contains: name, mode: "insensitive" }
        }
    });
}

export function findMemberByCode(code: string) {
    return prisma.member.findUnique({
        where: { memberCode: code }
    });
}
