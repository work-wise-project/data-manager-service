/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCareer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEducation` table. If the table is not empty, all the data it contains will be lost.

*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('audio', 'text');

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCareer" DROP CONSTRAINT "UserCareer_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEducation" DROP CONSTRAINT "UserEducation_userId_fkey";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Resume";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserCareer";

-- DropTable
DROP TABLE "UserEducation";

-- DropEnum
DROP TYPE "FileType";

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user" UUID NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "job_link" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_analysis" (
    "interview" UUID NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" "file_type" NOT NULL,
    "analysis" JSONB NOT NULL,

    CONSTRAINT "interview_analysis_pkey" PRIMARY KEY ("interview")
);

-- CreateTable
CREATE TABLE "interview_preparation" (
    "interview" UUID NOT NULL,
    "company_id" INTEGER NOT NULL,
    "job_info" TEXT NOT NULL,
    "material_links" TEXT[],

    CONSTRAINT "interview_preparation_pkey" PRIMARY KEY ("interview")
);

-- CreateTable
CREATE TABLE "resume" (
    "user" UUID NOT NULL,
    "file" TEXT NOT NULL,
    "analysis" TEXT,
    "spell_check" TEXT,

    CONSTRAINT "resume_pkey" PRIMARY KEY ("user")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "refresh_tokens" TEXT[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_career" (
    "id" SERIAL NOT NULL,
    "user" UUID NOT NULL,
    "company" TEXT,
    "job_title" TEXT,
    "years" INTEGER NOT NULL,

    CONSTRAINT "user_career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_education" (
    "id" SERIAL NOT NULL,
    "user" UUID NOT NULL,
    "institute" TEXT NOT NULL,
    "years" INTEGER NOT NULL,

    CONSTRAINT "user_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_skill" (
    "user" UUID NOT NULL,
    "skill" INTEGER NOT NULL,

    CONSTRAINT "user_skill_pkey" PRIMARY KEY ("user","skill")
);

-- CreateIndex
CREATE UNIQUE INDEX "skill_name_key" ON "skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "interview" ADD CONSTRAINT "interview_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "interview_analysis" ADD CONSTRAINT "interview_analysis_interview_fkey" FOREIGN KEY ("interview") REFERENCES "interview"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "interview_preparation" ADD CONSTRAINT "interview_preparation_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "interview_preparation" ADD CONSTRAINT "interview_preparation_interview_fkey" FOREIGN KEY ("interview") REFERENCES "interview"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_career" ADD CONSTRAINT "user_career_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_education" ADD CONSTRAINT "user_education_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_skill" ADD CONSTRAINT "user_skill_skill_fkey" FOREIGN KEY ("skill") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_skill" ADD CONSTRAINT "user_skill_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
