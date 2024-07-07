/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Stack` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "content" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "degree" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Stack_name_key" ON "Stack"("name");
