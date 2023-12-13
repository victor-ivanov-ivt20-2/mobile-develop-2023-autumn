/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_addressId_fkey";

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;

-- DropTable
DROP TABLE "Address";
