import { NextRequest, NextResponse } from 'next/server';
import { createQuizQuestionSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';

// dev -  needs pagination
// get all quiz_q's
export async function GET(request: NextRequest) {
  try {
    const quiz_questions = await prisma.quiz.findMany();
    return NextResponse.json(quiz_questions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// create quiz_q's for quiz
export async function POST(request: NextRequest) {
  try {
    // handle request
    const body = await request.json();
    const validate = createQuizQuestionSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 500 });
    }

    // dev - get quiz id from searhc params

    /**
     * sort the incoming choice object-{choiceIndex, choice} and extracnt {choice}
     * after cheking if its empty ( if empty [] is assinged)
     */
    const choiceArray = validate.data.choices
      .sort((a, b) => a.choiceIndex - b.choiceIndex)
      .map((choice) => choice.choice);

    // create quiz_question
    const quizQuestion = await prisma.quizQuestion.create({
      data: {
        quizId: validate.data.quizId,
        question: validate.data.quizId,
        choices: choiceArray,
        correctChoice: validate.data.correctChoice,
      },
    });

    return NextResponse.json(quizQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
