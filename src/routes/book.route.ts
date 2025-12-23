import express from "express";
import * as service from "../services/bookService";

const router = express.Router();

router.get("/", async (req, res) => {
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const keyword = (req.query.keyword as string) || "";

    try {
        // validate input
        if (pageNo < 1 || pageSize < 1) {
            res.status(400).send("Invalid pageNo or pageSize");
            return;
        }

        const result = await service.getBooksWithPagination(
            keyword,
            pageSize,
            pageNo
        );

        if (result.books.length === 0) {
            res.status(404).send("No books found");
            return;
        }

        res.setHeader("x-total-count", result.count.toString());
        res.json(result.books);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;

    } finally {
        console.log(
            `Book request completed: pageNo=${pageNo}, pageSize=${pageSize}, keyword=${keyword}`
        );
    }
});

export default router;

