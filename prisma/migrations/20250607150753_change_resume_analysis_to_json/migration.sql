/*
  Warnings:

  - The `analysis` column on the `resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "resume" DROP COLUMN "analysis",
ADD COLUMN     "analysis" JSONB;
