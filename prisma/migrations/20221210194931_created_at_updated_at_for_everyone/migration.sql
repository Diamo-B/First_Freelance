/*
  Warnings:

  - Added the required column `UpdatedAt` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administrator` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `cart` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `thumbnail` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;
