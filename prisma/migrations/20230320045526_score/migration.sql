/*
  Warnings:

  - Added the required column `score` to the `MovieReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MovieReview` ADD COLUMN `score` INTEGER NOT NULL;
