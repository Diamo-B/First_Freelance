-- CreateTable
CREATE TABLE `Cart` (
    `Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartsOnProducts` (
    `ProductId` INTEGER NOT NULL,
    `CartUiid` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ProductId`, `CartUiid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartsOnProducts` ADD CONSTRAINT `CartsOnProducts_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartsOnProducts` ADD CONSTRAINT `CartsOnProducts_CartUiid_fkey` FOREIGN KEY (`CartUiid`) REFERENCES `Cart`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
