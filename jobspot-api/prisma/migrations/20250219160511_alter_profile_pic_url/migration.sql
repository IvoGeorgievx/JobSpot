/*
  Warnings:

  - You are about to drop the column `profilePicUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicantProfile" ADD COLUMN     "profilePicUrl" TEXT;

-- AlterTable
ALTER TABLE "CompanyProfile" ADD COLUMN     "profilePicUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicUrl";
