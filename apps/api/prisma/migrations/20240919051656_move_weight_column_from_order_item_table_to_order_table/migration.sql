/*
  Warnings:

  - You are about to drop the column `weight` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "weight" DECIMAL(8,2) NOT NULL DEFAULT 1;
