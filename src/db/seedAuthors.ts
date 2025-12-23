import { prisma } from "../lib/prisma";

export async function seedAuthors() {
    const author1 = await prisma.author.create({
        data: { firstName: "Robert", lastName: "Martin", affiliation: "Clean Code Inc" },
    });

    const author2 = await prisma.author.create({
        data: { firstName: "Martin", lastName: "Fowler", affiliation: "ThoughtWorks" },
    });

    return [author1, author2];
}
