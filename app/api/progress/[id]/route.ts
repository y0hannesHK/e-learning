import { updateProgressSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get single progress
export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    const progress = await prisma.progressTracking.findUnique({
      where: {
        id: id,
      },
    });

    if (!progress) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }
    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// update progress
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if progress's in db
    const progress = await prisma.progressTracking.findUnique({
      where: {
        id: id,
      },
    });
    if (!progress) {
      return NextResponse.json(
        { error: 'progress not found' },
        { status: 404 }
      );
    }

    // handle request
    const validate = updateProgressSchema.safeParse(await request.json());
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 404 });
    }

    // update progress
    const updatedProgress = await prisma.progressTracking.update({
      where: {
        id: id,
      },
      data: {
        lessonId: validate.data.lessonId,
        isCompleted: validate.data.isCompleted,
        completedAt: validate.data.completedAt,
      },
    });
    return NextResponse.json(updatedProgress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if progress's in db
    const progress = await prisma.progressTracking.findUnique({
      where: {
        id: id,
      },
    });
    if (!progress) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }

    // delete progress
    const deletedProgress = await prisma.progressTracking.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedProgress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
