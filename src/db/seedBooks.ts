import { prisma } from "../lib/prisma";

export async function seedBooks() {
    const author = await prisma.author.create({
        data: {
            firstName: "George",
            lastName: "Orwell",
            affiliation: "British Writer",
            books: {
                create: [
                    { title: "1984", isbn: "9780451524935", category: "Novel" },
                    { title: "Animal Farm", isbn: "9780451526342", category: "Political Satire" }
                ]
            }
        }
    });
}
