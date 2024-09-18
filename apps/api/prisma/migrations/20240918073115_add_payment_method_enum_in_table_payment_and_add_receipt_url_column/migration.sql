/*
  Warnings:

  - You are about to drop the column `name` on the `order_progresses` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `payments` table. All the data in the column will be lost.
  - Added the required column `status` to the `order_progresses` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `method` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PaymentGateway', 'Manual');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('WAITING_FOR_PICKUP', 'ON_PROGRESS_PICKUP', 'ARRIVED_AT_OUTLET', 'ON_PROGRESS_WASHING', 'ON_PROGRESS_IRONING', 'ON_PROGRESS_PACKING', 'WAITING_FOR_PAYMENT', 'ON_PROGRESS_DROPOFF', 'COMPLETED_ORDER');

-- AlterTable
ALTER TABLE "order_progresses" DROP COLUMN "name",
ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "is_payable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "amount",
ADD COLUMN     "receipt_url" TEXT,
DROP COLUMN "method",
ADD COLUMN     "method" "PaymentMethod" NOT NULL;
