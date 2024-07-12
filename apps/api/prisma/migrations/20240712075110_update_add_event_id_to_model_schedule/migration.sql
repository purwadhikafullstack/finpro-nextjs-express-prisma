/*
  Warnings:

  - Added the required column `eventId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `eventId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
