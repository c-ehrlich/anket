import { Question } from "@prisma/client";

export async function addQuestionToSurvey({data, position: undefined}: {data: CreateQuestionInput, position: number | undefined}) {
}

export async function moveQuestionToPosition(questionId: string, position: number) {

}