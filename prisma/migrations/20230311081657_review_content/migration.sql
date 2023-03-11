/*
  Warnings:

  - Added the required column `content` to the `MovieReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MovieReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MovieReview` ADD COLUMN `content` LONGTEXT NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
