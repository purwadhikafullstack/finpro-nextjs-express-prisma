/*
  Warnings:

  - You are about to drop the column `province` on the `customer_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `customer_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `outlets` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `outlets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer_addresses" DROP COLUMN "province",
DROP COLUMN "street",
ADD COLUMN     "city_district" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Home',
ADD COLUMN     "region" TEXT,
ADD COLUMN     "road" TEXT,
ADD COLUMN     "suburb" TEXT,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "zipcode" DROP NOT NULL,
ALTER COLUMN "formatted" DROP NOT NULL;

-- AlterTable
ALTER TABLE "outlets" DROP COLUMN "province",
DROP COLUMN "street",
ADD COLUMN     "city_district" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "road" TEXT,
ADD COLUMN     "suburb" TEXT,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "zipcode" DROP NOT NULL,
ALTER COLUMN "formatted" DROP NOT NULL;
