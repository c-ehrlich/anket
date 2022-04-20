/*
  Warnings:

  - Added the required column `order` to the `MultipleChoiceOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MultipleChoiceOption" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "order" INTEGER NOT NULL;
