/*
  Warnings:

  - You are about to drop the column `isAnonymous` on the `SurveyParticipation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SurveyParticipation" DROP COLUMN "isAnonymous",
ALTER COLUMN "isComplete" SET DEFAULT false;
