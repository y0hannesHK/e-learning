import { NextRequest, NextResponse } from 'next/server';
import { createLessonSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';

// dev -  needs pagination
// get all lessons
export async function GET(request: NextRequest) {
  const lessons = await prisma.lesson.findMany();
  return NextResponse.json(lessons, { status: 200 });
}

// create lesson for a lesson
export async function POST(request: NextRequest) {
  // handle request
  const body = await request.json();
  const validate = createLessonSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json({ error: validate.error }, { status: 500 });
  }

  // dev - get lesson id from searhc params

  /**
   * sort the incoming content object-{contectIndex, coutent} and extracnt {content}
   * after cheking if its empty ( if empty [] is assinged)
   */
  const contentArray = validate.data.contents
    .sort((a, b) => a.contentIndex - b.contentIndex)
    .map((content) => content.content);

  // update lesson
  const lesson = await prisma.lesson.create({
    data: {
      courseId: validate.data.courseId,
      title: validate.data.title,
      videoUrl: validate.data.videoUrl,
      contents: contentArray,
      orderIndex: validate.data.orderIndex,
    },
  });

  return NextResponse.json(lesson, { status: 201 });
}
