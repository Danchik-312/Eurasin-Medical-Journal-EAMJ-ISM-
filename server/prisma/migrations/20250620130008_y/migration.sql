/*
  Warnings:

  - You are about to drop the column `author` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Journal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[issue]` on the table `Journal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[issue,year]` on the table `Journal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authors` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_journalId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "author",
ADD COLUMN     "authors" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "journalId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "title",
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Journal_issue_key" ON "Journal"("issue");

-- CreateIndex
CREATE UNIQUE INDEX "Journal_issue_year_key" ON "Journal"("issue", "year");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
