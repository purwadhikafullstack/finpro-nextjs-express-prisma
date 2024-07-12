/*
  Warnings:

  - You are about to drop the column `quantity` on the `eventticket` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `myticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `myticket` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `qty` to the `EventTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `EventTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQty` to the `EventTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EventTicketId` to the `MyTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `myticket` DROP FOREIGN KEY `MyTicket_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `myticket` DROP FOREIGN KEY `MyTicket_ticketId_fkey`;

-- AlterTable
ALTER TABLE `coupon` ADD COLUMN `includedEventCategoryId` INTEGER NULL,
    ADD COLUMN `includedEventId` INTEGER NULL,
    MODIFY `discountPercentage` DOUBLE NULL,
    MODIFY `priceCut` DOUBLE NULL;

-- AlterTable
ALTER TABLE `eventticket` DROP COLUMN `quantity`,
    ADD COLUMN `qty` INTEGER NOT NULL,
    ADD COLUMN `scheduleId` INTEGER NOT NULL,
    ADD COLUMN `totalQty` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `myticket` DROP COLUMN `eventId`,
    DROP COLUMN `ticketId`,
    ADD COLUMN `EventTicketId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `roleId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyTicket` ADD CONSTRAINT `MyTicket_EventTicketId_fkey` FOREIGN KEY (`EventTicketId`) REFERENCES `EventTicket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventTicket` ADD CONSTRAINT `EventTicket_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coupon` ADD CONSTRAINT `Coupon_includedEventId_fkey` FOREIGN KEY (`includedEventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coupon` ADD CONSTRAINT `Coupon_includedEventCategoryId_fkey` FOREIGN KEY (`includedEventCategoryId`) REFERENCES `Genre`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
