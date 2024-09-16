/*
  Warnings:

  - You are about to drop the column `price` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "price",
ADD COLUMN     "delivery_fee" DECIMAL(8,2) NOT NULL DEFAULT 0,
ADD COLUMN     "laundry_fee" DECIMAL(8,2) NOT NULL DEFAULT 0;
