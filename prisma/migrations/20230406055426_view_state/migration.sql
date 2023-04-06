-- AlterTable
ALTER TABLE `User` ADD COLUMN `isLikeView` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `isPreferenceView` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `isReviewView` BOOLEAN NULL DEFAULT true;
