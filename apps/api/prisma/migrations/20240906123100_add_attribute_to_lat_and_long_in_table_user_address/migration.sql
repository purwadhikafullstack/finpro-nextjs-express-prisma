/*
  Warnings:

  - You are about to alter the column `latitude` on the `UserAddress` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,7)`.
  - You are about to alter the column `longitude` on the `UserAddress` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,7)`.

*/
-- AlterTable
ALTER TABLE "UserAddress" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(11,7),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(11,7);
