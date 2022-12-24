/*
  Warnings:

  - You are about to drop the `_ordertoprodxquantity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `OrderId` to the `ProdXQuantity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ordertoprodxquantity` DROP FOREIGN KEY `_OrderToProdXQuantity_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoprodxquantity` DROP FOREIGN KEY `_OrderToProdXQuantity_B_fkey`;

-- AlterTable
ALTER TABLE `prodxquantity` ADD COLUMN `OrderId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_ordertoprodxquantity`;

-- AddForeignKey
ALTER TABLE `ProdXQuantity` ADD CONSTRAINT `ProdXQuantity_OrderId_fkey` FOREIGN KEY (`OrderId`) REFERENCES `Order`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
