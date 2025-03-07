/*
  Warnings:

  - A unique constraint covering the columns `[jobPostingId,applicantProfileId]` on the table `JobApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobPostingId_applicantProfileId_key" ON "JobApplication"("jobPostingId", "applicantProfileId");
