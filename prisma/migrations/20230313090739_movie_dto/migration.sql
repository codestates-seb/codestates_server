/*
  Warnings:

  - Added the required column `company` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movie` ADD COLUMN `company` VARCHAR(191) NOT NULL,
    ADD COLUMN `genre` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` VARCHAR(191) NOT NULL,
    ADD COLUMN `runtime` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `MovieStaff` (
    `movieId` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`movieId`, `staffId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieActor` (
    `movieId` VARCHAR(191) NOT NULL,
    `actorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`movieId`, `actorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieStaff` ADD CONSTRAINT `MovieStaff_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieStaff` ADD CONSTRAINT `MovieStaff_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `Actor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
