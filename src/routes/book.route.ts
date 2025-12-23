import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

/**
 * GET /books
 * GET /books?title=xxx
 * GET /books?dueDate=YYYY-MM-DD
 */
router.get("/", async (req, res) => {
    const { title, dueDate } = req.query;

    // 🔎 ค้นหาตามชื่อหนังสือ
    if (title) {
        const books = await prisma.book.findMany({
            where: {
                title: {
                    contains: title as string,
                    mode: "insensitive",
                },
            },
            include: {
                author: true,
            },
        });
        return res.json(books);
    }

    // 📅 หนังสือที่กำหนดคืนในวันที่กำหนด
    if (dueDate) {
        // @ts-ignore
        const borrows = await prisma.borrow.findMany({
            where: {
                dueDate: new Date(dueDate as string),
            },
            include: {
                book: {
                    include: {
                        author: true,
                    },
                },
                member: true,
            },
        });

        return res.json(borrows);
    }

    // 📚 หนังสือทั้งหมด
    const books = await prisma.book.findMany({
        include: {
            author: true,
        },
    });

    res.json(books);
});

/**
 * GET /books/not-returned
 * หนังสือที่ยังไม่ได้คืน
 */
router.get("/not-returned", async (_req, res) => {
    // @ts-ignore
    const borrows = await prisma.borrow.findMany({
        where: {
            returnedAt: null,
        },
        include: {
            book: {
                include: {
                    author: true,
                },
            },
            member: true,
        },
    });

    res.json(borrows);
});

export default router;

