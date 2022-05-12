/*
  Warnings:

  - You are about to drop the column `multipleChoiceOptionId` on the `QuestionResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_multipleChoiceOptionId_fkey";

-- AlterTable
ALTER TABLE "QuestionResponse" DROP COLUMN "multipleChoiceOptionId";

-- CreateTable
CREATE TABLE "MultipleChoiceOptionSelection" (
    "id" TEXT NOT NULL,
    "multipleChoiceOptionId" TEXT NOT NULL,
    "surveyParticipationId" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MultipleChoiceOptionSelection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MultipleChoiceOptionSelection" ADD CONSTRAINT "MultipleChoiceOptionSelection_multipleChoiceOptionId_fkey" FOREIGN KEY ("multipleChoiceOptionId") REFERENCES "MultipleChoiceOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultipleChoiceOptionSelection" ADD CONSTRAINT "MultipleChoiceOptionSelection_surveyParticipationId_fkey" FOREIGN KEY ("surveyParticipationId") REFERENCES "SurveyParticipation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
