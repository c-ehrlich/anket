/*
  Warnings:

  - Made the column `details` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Survey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "details" SET NOT NULL;

-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "description" SET NOT NULL;
