/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transaction_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoice_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "transaction_id",
ADD COLUMN     "invoice_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_transaction_id_key" ON "Order"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_invoice_id_key" ON "Payment"("invoice_id");
