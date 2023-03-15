/*
  Warnings:

  - You are about to drop the column `socialId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_socialId_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `socialId`,
    ADD COLUMN `birth` VARCHAR(191) NULL,
    ADD COLUMN `nickname` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;
