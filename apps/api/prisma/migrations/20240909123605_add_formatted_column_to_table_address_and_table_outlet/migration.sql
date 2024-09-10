/*
  Warnings:

  - Added the required column `formatted` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formatted` to the `outlets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_addresses" ADD COLUMN     "formatted" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outlets" ADD COLUMN     "formatted" TEXT NOT NULL;
