-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_CartId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `CartId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
