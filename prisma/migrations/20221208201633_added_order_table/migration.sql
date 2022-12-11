-- CreateTable
CREATE TABLE `Order` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ClientFirstName` VARCHAR(191) NULL,
    `ClientLastName` VARCHAR(191) NULL,
    `ClientPhoneNumber` VARCHAR(191) NULL,
    `ClientWhatsappNumber` VARCHAR(191) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderToProduct_AB_unique`(`A`, `B`),
    INDEX `_OrderToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
