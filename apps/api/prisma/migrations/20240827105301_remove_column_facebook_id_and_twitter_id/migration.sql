/*
  Warnings:

  - You are about to drop the column `facebookId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_facebookId_key";

-- DropIndex
DROP INDEX "User_twitterId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "facebookId",
DROP COLUMN "twitterId";
