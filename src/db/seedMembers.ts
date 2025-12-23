import { prisma } from "../lib/prisma";

export async function seedMembers() {
    const member1 = await prisma.member.create({
        data: { memberCode: "M001", firstName: "Alice", lastName: "Smith", phone: "0812345678" },
    });

    const member2 = await prisma.member.create({
        data: { memberCode: "M002", firstName: "Bob", lastName: "Johnson", phone: "0898765432" },
    });

    return [member1, member2];
}
