import { NextRequest, NextResponse } from 'next/server';
import { createQuizSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';

// dev -  needs pagination
// get all quizzes
export async function GET(request: NextRequest) {
  try {
    const quizzes = await prisma.quiz.findMany();
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// create quiz for a lesson
export async function POST(request: NextRequest) {
  try {
    // handle request
    const body = await request.json();
    const validate = createQuizSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 500 });
    }

    // dev - get lesson and course id from searhc params

    // create quiz
    const lesson = await prisma.quiz.create({
      data: {
        courseId: validate.data.courseId,
        lessonId: validate.data.lessonId,
        title: validate.data.title,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
