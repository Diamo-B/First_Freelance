/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `administrator` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `administrator` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `thumbnail` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `thumbnail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `administrator` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `UpdatedAt`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `UpdatedAt`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`;

-- AlterTable
ALTER TABLE `thumbnail` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`;
