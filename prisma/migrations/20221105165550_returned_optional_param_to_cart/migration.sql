-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_CartId_fkey`;

-- AlterTable
ALTER TABLE `Item` MODIFY `CartId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_CartId_fkey` FOREIGN KEY (`CartId`) REFERENCES `Cart`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
