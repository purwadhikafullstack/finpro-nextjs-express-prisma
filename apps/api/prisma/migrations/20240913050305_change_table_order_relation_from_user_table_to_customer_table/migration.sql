/*
  Warnings:

  - You are about to drop the column `user_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `customer_address_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_user_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "user_id",
ADD COLUMN     "customer_address_id" TEXT NOT NULL,
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "user_id",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;
