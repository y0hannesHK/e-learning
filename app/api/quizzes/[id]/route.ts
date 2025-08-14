import { updateQuizSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get single quiz
export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }
    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// update quiz
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if quiz's in db
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
    if (!quiz) {
      return NextResponse.json({ error: 'quiz not found' }, { status: 404 });
    }

    // handle request
    const validate = updateQuizSchema.safeParse(await request.json());
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 404 });
    }

    // update quiz
    const updatedQuiz = await prisma.quiz.update({
      where: {
        id: id,
      },
      data: {
        title: validate.data.title,
      },
    });
    return NextResponse.json(updatedQuiz, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if quiz's in db
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
    if (!quiz) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }

    // delete quiz
    const deletedQuiz = await prisma.quiz.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedQuiz, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
