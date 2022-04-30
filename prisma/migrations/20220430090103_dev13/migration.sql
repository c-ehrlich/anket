/*
  Warnings:

  - You are about to drop the column `isAnonymous` on the `QuestionResponse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionResponse" DROP COLUMN "isAnonymous",
ALTER COLUMN "multipleChoiceOptionId" DROP NOT NULL;
