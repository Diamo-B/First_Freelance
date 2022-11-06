/*
  Warnings:

  - You are about to drop the column `CartId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_CartId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `CartId`,
    ADD COLUMN `Stock` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Item` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductId` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `CartId` INTEGER NULL,

    UNIQUE INDEX `Item_ProductId_key`(`ProductId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
