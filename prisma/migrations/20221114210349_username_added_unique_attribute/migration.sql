/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Administrator_Username_key` ON `Administrator`(`Username`);
