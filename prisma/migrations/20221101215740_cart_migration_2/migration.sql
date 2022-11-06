/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `Id` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `CartsOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CartUiid` on the `CartsOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `CartsOnProducts` table. All the data in the column will be lost.
  - Added the required column `CartId` to the `CartsOnProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartsOnProducts` DROP FOREIGN KEY `CartsOnProducts_CartUiid_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP PRIMARY KEY,
    MODIFY `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `CartsOnProducts` DROP PRIMARY KEY,
    DROP COLUMN `CartUiid`,
    DROP COLUMN `assignedBy`,
    ADD COLUMN `CartId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`ProductId`, `CartId`);

-- AddForeignKey
ALTER TABLE `CartsOnProducts` ADD CONSTRAINT `CartsOnProducts_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
