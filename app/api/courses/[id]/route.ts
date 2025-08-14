import { updateCourseSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get single course
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
  });

  if (!course) {
    return NextResponse.json({ error: 'error' }, { status: 404 });
  }
  return NextResponse.json(course, { status: 200 });
}

// update course
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // check if course's in db
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
  });
  if (!course) {
    return NextResponse.json({ error: 'error' }, { status: 404 });
  }

  // handle request
  const validate = updateCourseSchema.safeParse(await request.json());
  if (!validate.success) {
    return NextResponse.json({ error: 'error' }, { status: 404 });
  }

  // update course
  const updateCourse = await prisma.course.update({
    where: {
      id: id,
    },
    data: {
      // dev - title and dexcription are for now
      title: validate.data.title,
      description: validate.data.description,
    },
  });
  return NextResponse.json(updateCourse, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // check if course's in db
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
  });
  if (!course) {
    return NextResponse.json({ error: 'error' }, { status: 404 });
  }

  // delete course
  const deletedcourse = await prisma.course.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deletedcourse, { status: 200 });
}
