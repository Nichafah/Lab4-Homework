import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /members
router.get("/", async (req, res) => {
    const name = req.query.name as string | undefined;

    if (name) {
        const members = await prisma.member.findMany({
            where: {
                OR: [
                    { firstName: { contains: name, mode: "insensitive" } },
                    { lastName: { contains: name, mode: "insensitive" } },
                ],
            },
        });
        return res.json(members);
    }

    const members = await prisma.member.findMany();
    res.json(members);
});

// GET /members/:memberCode
router.get("/:memberCode", async (req, res) => {
    const member = await prisma.member.findUnique({
        where: { memberCode: req.params.memberCode },
    });

    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
});

export default router;
