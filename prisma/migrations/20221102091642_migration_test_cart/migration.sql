/*
  Warnings:

  - You are about to drop the `CartsOnProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CartId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartsOnProducts` DROP FOREIGN KEY `CartsOnProducts_CartId_fkey`;

-- DropForeignKey
ALTER TABLE `CartsOnProducts` DROP FOREIGN KEY `CartsOnProducts_ProductId_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `CartId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `CartsOnProducts`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
