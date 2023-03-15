/*
  Warnings:

  - You are about to drop the column `realesedAt` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `releasedAt` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movie` DROP COLUMN `realesedAt`,
    ADD COLUMN `releasedAt` VARCHAR(191) NOT NULL;
