import { prisma } from "../lib/prisma";
import { seedAuthors } from "./seedAuthors";
import { seedBooks } from "./seedBooks";
import { seedMembers } from "./seedMembers";
import { seedBorrows } from "./seedBorrows";

async function main() {
    // ลบข้อมูลตามลำดับความสัมพันธ์
    await prisma.borrow.deleteMany();
    await prisma.book.deleteMany();
    await prisma.member.deleteMany();
    await prisma.author.deleteMany();

    // seed ใหม่
    const authors = await seedAuthors();
    await seedBooks(authors);
    const members = await seedMembers();
    await seedBorrows(members);

    console.log("🌱 Database seeded successfully");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });


