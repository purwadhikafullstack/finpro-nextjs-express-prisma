/*
  Warnings:

  - The primary key for the `UserAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UserAddress_id` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `user_address_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "user_address_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_pkey",
DROP COLUMN "UserAddress_id",
ADD COLUMN     "user_address_id" SERIAL NOT NULL,
ADD CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("user_address_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_address_id_fkey" FOREIGN KEY ("user_address_id") REFERENCES "UserAddress"("user_address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
