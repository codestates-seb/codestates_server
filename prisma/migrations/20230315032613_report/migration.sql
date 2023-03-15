-- CreateTable
CREATE TABLE `ReviewReport` (
    `id` VARCHAR(191) NOT NULL,
    `constent` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `type` ENUM('PENDING', 'IGNORE', 'USER_DELETE') NOT NULL DEFAULT 'PENDING',
    `reivewId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReviewReport` ADD CONSTRAINT `ReviewReport_reivewId_fkey` FOREIGN KEY (`reivewId`) REFERENCES `MovieReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewReport` ADD CONSTRAINT `ReviewReport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
