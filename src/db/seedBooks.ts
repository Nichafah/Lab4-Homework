import { prisma } from "../lib/prisma";

export async function seedBooks(authors: { firstName: string; lastName: string; affiliation: string | null; id: number; }[]) {
    const author1 = await prisma.author.create({
        data: { firstName: "Robert", lastName: "Martin", affiliation: "Clean Code Inc" },
    });

    const author2 = await prisma.author.create({
        data: { firstName: "Martin", lastName: "Fowler", affiliation: "ThoughtWorks" },
    });

    await prisma.book.createMany({
        data: [
            { title: "Clean Code", isbn: "9780132350884", category: "Software", authorId: author1.id },
            { title: "Refactoring", isbn: "9780201485677", category: "Software", authorId: author2.id },
        ],
    });
}


