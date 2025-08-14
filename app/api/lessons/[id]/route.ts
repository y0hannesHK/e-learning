import { updateLessonSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get single lesson
export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }
    return NextResponse.json(lesson, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// update lesson
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if lesson's in db
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id,
      },
    });
    if (!lesson) {
      return NextResponse.json({ error: 'lesson not found' }, { status: 404 });
    }

    // handle request
    const validate = updateLessonSchema.safeParse(await request.json());
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 404 });
    }

    /**
     * sort the incoming content object-{contectIndex, coutent} and extracnt {content}
     * after cheking if its empty ( if empty [] is assinged)
     */
    const contentArray = (validate.data.contents ?? [])
      .sort((a, b) => a.contentIndex - b.contentIndex)
      .map((content) => content.content);

    // update lesson
    const updatelesson = await prisma.lesson.update({
      where: {
        id: id,
      },
      data: {
        title: validate.data.title,
        videoUrl: validate.data.videoUrl,
        contents: contentArray,
        orderIndex: validate.data.orderIndex,
      },
    });
    return NextResponse.json(updatelesson, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'could get lesson from db error' },

      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if lesson's in db
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id,
      },
    });
    if (!lesson) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }

    // delete lesson
    const deletedlesson = await prisma.lesson.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedlesson, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'db error' },

      { status: 500 }
    );
  }
}
