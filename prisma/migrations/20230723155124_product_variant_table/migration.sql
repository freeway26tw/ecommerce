/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_productId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`,
    DROP COLUMN `sku`;

-- DropTable
DROP TABLE `inventory`;

-- CreateTable
CREATE TABLE `ProductVariant` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `picture` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
