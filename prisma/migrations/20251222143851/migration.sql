/*
  Warnings:

  - You are about to drop the `BorrowRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BorrowRecord" DROP CONSTRAINT "BorrowRecord_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowRecord" DROP CONSTRAINT "BorrowRecord_memberId_fkey";

-- DropTable
DROP TABLE "BorrowRecord";

-- CreateTable
CREATE TABLE "Borrow" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
