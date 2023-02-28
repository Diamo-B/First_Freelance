/*
  Warnings:

  - A unique constraint covering the columns `[Title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_Title_key` ON `Category`(`Title`);
