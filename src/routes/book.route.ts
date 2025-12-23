import express from "express";
import * as service from "../services/bookService";

const router = express.Router();

router.get("/", async (req, res) => {
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const keyword = (req.query.keyword as string) || "";

    const result = await service.searchBooks(keyword, pageSize, pageNo);

    res.setHeader("x-total-count", result.count.toString());
    res.json(result.books);
});

export default router;

