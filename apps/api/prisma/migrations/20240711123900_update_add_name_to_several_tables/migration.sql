/*
  Warnings:

  - Added the required column `name` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `EventTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coupon` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `eventticket` ADD COLUMN `name` VARCHAR(191) NOT NULL;
