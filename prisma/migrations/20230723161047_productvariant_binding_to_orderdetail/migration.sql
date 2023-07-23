/*
  Warnings:

  - You are about to drop the column `productId` on the `orderdetail` table. All the data in the column will be lost.
  - Added the required column `productVariantId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderdetail` DROP FOREIGN KEY `OrderDetail_productId_fkey`;

-- AlterTable
ALTER TABLE `orderdetail` DROP COLUMN `productId`,
    ADD COLUMN `productVariantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `ProductVariant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
