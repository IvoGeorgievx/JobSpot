/*
  Warnings:

  - You are about to drop the column `fields` on the `JobPosting` table. All the data in the column will be lost.
  - The `requirements` column on the `JobPosting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `field` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "fields",
ADD COLUMN     "field" TEXT NOT NULL,
DROP COLUMN "requirements",
ADD COLUMN     "requirements" TEXT[];
