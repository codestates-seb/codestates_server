/*
  Warnings:

  - You are about to alter the column `score` on the `MovieReview` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `score` on the `MovieScore` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `MovieReview` MODIFY `score` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `MovieScore` MODIFY `score` DOUBLE NOT NULL;
