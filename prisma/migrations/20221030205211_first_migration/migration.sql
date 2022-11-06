-- CreateTable
CREATE TABLE `Product` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Uuid` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Price` DOUBLE NOT NULL,
    `DiscountRate` DOUBLE NULL,
    `CategoryId` INTEGER NOT NULL,
    `Status` ENUM('InStock', 'OutOfStock') NOT NULL,

    UNIQUE INDEX `Product_Uuid_key`(`Uuid`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Thumbnail` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Path` VARCHAR(191) NOT NULL,
    `ProductId` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thumbnail` ADD CONSTRAINT `Thumbnail_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
