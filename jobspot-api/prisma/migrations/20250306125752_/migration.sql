/*
  Warnings:

  - The `salaryMin` column on the `JobPosting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salaryMax` column on the `JobPosting` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "salaryMin",
ADD COLUMN     "salaryMin" INTEGER,
DROP COLUMN "salaryMax",
ADD COLUMN     "salaryMax" INTEGER;
