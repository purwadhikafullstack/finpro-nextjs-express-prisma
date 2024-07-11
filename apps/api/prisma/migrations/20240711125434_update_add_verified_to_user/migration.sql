-- AlterTable
ALTER TABLE `user` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `phoneNumber` VARCHAR(191) NULL;
