-- DropForeignKey
ALTER TABLE `prodxquantity` DROP FOREIGN KEY `ProdXQuantity_OrderId_fkey`;

-- AlterTable
ALTER TABLE `prodxquantity` MODIFY `OrderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ProdXQuantity` ADD CONSTRAINT `ProdXQuantity_OrderId_fkey` FOREIGN KEY (`OrderId`) REFERENCES `Order`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
