import { updateQuizQuestionSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get single quiz_q
export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    const quizQuestion = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });

    if (!quizQuestion) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }
    return NextResponse.json(quizQuestion, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// update quizQuestion
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if quizQuestion's in db
    const quizQuestion = await prisma.quizQuestion.findUnique({
      where: {
        id: id,
      },
    });
    if (!quizQuestion) {
      return NextResponse.json(
        { error: 'quizQuestion not found' },
        { status: 404 }
      );
    }

    // handle request
    const validate = updateQuizQuestionSchema.safeParse(await request.json());
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 404 });
    }

    // dev - get quiz id from searhc params

    /**
     * sort the incoming choice object-{choiceIndex, choice} and extracnt {choice}
     * after cheking if its empty ( if empty [] is assinged)
     */
    const choiceArray = (validate.data.choices ?? [])
      .sort((a, b) => a.choiceIndex - b.choiceIndex)
      .map((choice) => choice.choice);

    // update quizQuestion
    const updatedquizQuestion = await prisma.quizQuestion.update({
      where: {
        id: id,
      },
      data: {
        question: validate.data.question,
        choices: choiceArray,
        correctChoice: validate.data.correctChoice,
      },
    });
    return NextResponse.json(updatedquizQuestion, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if quizQuestion's in db
    const quizQuestion = await prisma.quizQuestion.findUnique({
      where: {
        id: id,
      },
    });
    if (!quizQuestion) {
      return NextResponse.json(
        { error: 'quizQuestion not found' },
        { status: 404 }
      );
    }

    // delete quizQuestion
    const deletedquizQuestion = await prisma.quizQuestion.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedquizQuestion, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
