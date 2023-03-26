-- CreateTable
CREATE TABLE `ReviewEnjoyPoint` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewTension` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReviewEnjoyPoint` ADD CONSTRAINT `ReviewEnjoyPoint_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `MovieReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewTension` ADD CONSTRAINT `ReviewTension_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `MovieReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
