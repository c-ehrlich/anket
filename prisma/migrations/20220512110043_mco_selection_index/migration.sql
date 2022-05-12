/*
  Warnings:

  - A unique constraint covering the columns `[surveyParticipationId,multipleChoiceOptionId]` on the table `MultipleChoiceOptionSelection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MultipleChoiceOptionSelection_surveyParticipationId_multipl_key" ON "MultipleChoiceOptionSelection"("surveyParticipationId", "multipleChoiceOptionId");
