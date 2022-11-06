/*
  Warnings:

  - Made the column `CartId` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_CartId_fkey`;

-- AlterTable
ALTER TABLE `Item` MODIFY `CartId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
