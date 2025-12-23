import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /borrows/due?date=2025-01-10
router.get("/due", async (req, res) => {
    const date = req.query.date as string;

    // @ts-ignore
    const borrows = await prisma.borrow.findMany({
        where: {
            dueDate: new Date(date),
        },
        include: {
            book: true,
            member: true,
        },
    });

    res.json(borrows);
});

// GET /borrows/not-returned
router.get("/not-returned", async (_req, res) => {
    // @ts-ignore
    const borrows = await prisma.Borrow.findMany({
        where: {
            returnedAt: null,
        },
        include: {
            book: true,
            member: true,
        },
    });

    res.json(borrows);
});

export default router;
