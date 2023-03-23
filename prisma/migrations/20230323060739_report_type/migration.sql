/*
  Warnings:

  - Made the column `type` on table `ReviewReport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ReviewReport` MODIFY `type` ENUM('PENDING', 'IGNORE', 'USER_DELETE') NOT NULL DEFAULT 'PENDING';
