import { prisma } from "../src/lib/prisma";
import { seedBooks } from "../src/db/seedBooks";
import { seedMembers } from "../src/db/seedMembers";

async function seed() {
    await prisma.borrowRecord.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.member.deleteMany();

    await seedBooks();
    await seedMembers();
}

await seed();
