/*
  Warnings:

  - You are about to drop the `MovieComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MovieComment` DROP FOREIGN KEY `MovieComment_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieComment` DROP FOREIGN KEY `MovieComment_userId_fkey`;

-- DropTable
DROP TABLE `MovieComment`;

-- CreateTable
CREATE TABLE `MovieReview` (
    `id` VARCHAR(191) NOT NULL,
    `movieId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieReview` ADD CONSTRAINT `MovieReview_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieReview` ADD CONSTRAINT `MovieReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
