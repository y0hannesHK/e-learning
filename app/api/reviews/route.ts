import { NextRequest, NextResponse } from 'next/server';
import { createReviewSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';

// dev -  needs pagination
// get all reviews
export async function GET(request: NextRequest) {
  try {
    const reviews = await prisma.review.findMany();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// create quiz for a lesson
export async function POST(request: NextRequest) {
  try {
    // handle request
    const body = await request.json();
    const validate = createReviewSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 500 });
    }

    // dev - get lesson and course id from searhc params

    // create quiz
    const lesson = await prisma.review.create({
      data: {
        courseId: validate.data.courseId,
        studentId: validate.data.studentId,
        comment: validate.data.comment,
        rating: validate.data.rating,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
