import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Enrollment } from '@/types/model_types';

interface Props {
  params: {
    id: string;
  };
}

// get single enrollment detail
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const enrollement = await prisma.enrollment.findUnique({ where: { id: id } });
  if (!enrollement) {
    return NextResponse.json({ error: 'error' }, { status: 404 });
  }

  return NextResponse.json(enrollement, { status: 200 });
}

// dev - enrollemnt have no feilds to be updated for now
// update enrollement
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // chekc if enrollment with id is in db
  const enrollement = await prisma.enrollment.findUnique({ where: { id: id } });
  if (!enrollement) {
    return NextResponse.json(
      { error: 'no enrollement found' },
      { status: 404 }
    );
  }

  // hanlde request
  const body: Enrollment = await request.json();
  if (!body) {
    return NextResponse.json(
      { error: 'invalid enrollement crederntials' },
      { status: 404 }
    );
  }

  // update enrollement
  const enrollment = await prisma.enrollment.update({
    where: {
      id: id,
    },
    data: {
      studentId: body.studentId,
      courseId: body.courseId,
    },
  });
  return NextResponse.json(enrollment, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // check if enrollment with id is in db
  const enrollement = await prisma.enrollment.findUnique({ where: { id: id } });
  if (!enrollement) {
    return NextResponse.json({ error: 'no enrollemnt found' }, { status: 404 });
  }

  // delete enrollment
  const deletedEnrollement = await prisma.enrollment.delete({
    where: { id: id },
  });
  return NextResponse.json(deletedEnrollement, { status: 200 });
}
