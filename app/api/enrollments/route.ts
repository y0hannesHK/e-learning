import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { createEnrollmentSchema } from '@/types/zod_schema';

// dev - needs paginatiion
// get all enrollements
export async function GET(request: NextRequest) {
  const enrollments = await prisma.enrollment.findMany();
  return NextResponse.json(enrollments, { status: 200 });
}

// create enrollemnt
export async function POST(request: NextRequest) {
  // handle request
  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: 'invalid enrollemt req body' },
      { status: 404 }
    );
  }

  const validate = createEnrollmentSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(validate.error, { status: 404 });
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      studentId: validate.data.studentId,
      courseId: validate.data.courseId,
    },
  });
  return NextResponse.json(enrollment, { status: 201 });
}
