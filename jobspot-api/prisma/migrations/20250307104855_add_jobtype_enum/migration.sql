/*
  Warnings:

  - Changed the type of `field` on the `JobPosting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobField" AS ENUM ('INFORMATION_TECHNOLOGY', 'HEALTHCARE_MEDICAL', 'ENGINEERING', 'EDUCATION_TEACHING', 'FINANCE_ACCOUNTING', 'MARKETING_ADVERTISING', 'SALES_BUSINESS_DEVELOPMENT', 'CUSTOMER_SERVICE_SUPPORT', 'HOSPITALITY_TOURISM', 'CONSTRUCTION_TRADES', 'TRANSPORTATION_LOGISTICS', 'RETAIL_ECOMMERCE', 'LEGAL_COMPLIANCE', 'CREATIVE_DESIGN', 'HUMAN_RESOURCES');

-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "field",
ADD COLUMN     "field" "JobField" NOT NULL;
