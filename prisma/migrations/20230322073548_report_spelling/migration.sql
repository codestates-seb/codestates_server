/*
  Warnings:

  - You are about to drop the column `reivewId` on the `ReviewReport` table. All the data in the column will be lost.
  - Added the required column `reviewId` to the `ReviewReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ReviewReport` DROP FOREIGN KEY `ReviewReport_reivewId_fkey`;

-- AlterTable
ALTER TABLE `ReviewReport` DROP COLUMN `reivewId`,
    ADD COLUMN `reviewId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ReviewReport` ADD CONSTRAINT `ReviewReport_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `MovieReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
