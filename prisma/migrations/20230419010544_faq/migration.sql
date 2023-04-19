/*
  Warnings:

  - A unique constraint covering the columns `[faqId]` on the table `FAQComment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FAQComment_faqId_key` ON `FAQComment`(`faqId`);
