import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
    const authors = await prisma.author.findMany();
    res.json(authors);
});

export default router;
