/*
  Warnings:

  - You are about to drop the column `constent` on the `ReviewReport` table. All the data in the column will be lost.
  - Added the required column `contents` to the `ReviewReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReviewReport` DROP COLUMN `constent`,
    ADD COLUMN `contents` VARCHAR(191) NOT NULL;
