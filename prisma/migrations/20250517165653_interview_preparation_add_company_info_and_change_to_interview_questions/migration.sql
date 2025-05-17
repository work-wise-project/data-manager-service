/*
  Warnings:

  - You are about to drop the column `company_id` on the `interview_preparation` table. All the data in the column will be lost.
  - You are about to drop the column `material_links` on the `interview_preparation` table. All the data in the column will be lost.
  - Added the required column `company_info` to the `interview_preparation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "interview_preparation" DROP CONSTRAINT "interview_preparation_company_id_fkey";

-- AlterTable
ALTER TABLE "interview_preparation" DROP COLUMN "company_id",
DROP COLUMN "material_links",
ADD COLUMN     "company_info" TEXT NOT NULL,
ADD COLUMN     "interview_questions" TEXT[];
