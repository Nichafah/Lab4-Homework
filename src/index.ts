import express from "express";
import bookRouter from "./routes/book.route";
import authorRouter from "./routes/author.route";
import memberRouter from "./routes/member.route";
import borrowRouter from "./routes/borrow.route";

const app = express();
app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/members", memberRouter);
app.use("/borrows", borrowRouter);

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
