/*
  Warnings:

  - You are about to drop the column `interview_questions` on the `interview_preparation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "interview_preparation" DROP COLUMN "interview_questions",
ADD COLUMN     "material_links" TEXT[];
