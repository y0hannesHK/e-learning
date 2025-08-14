import { NextRequest, NextResponse } from 'next/server';
import { createCourseSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';

// dev -  needs pagination
// get all courses
export async function GET(request: NextRequest) {
  const courses = await prisma.course.findMany();
  return NextResponse.json(courses, { status: 200 });
}

// create course
export async function POST(request: NextRequest) {
  // handle request
  const body = await request.json();
  const validate = createCourseSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json({ error: validate.error }, { status: 500 });
  }

  // dev - get user id form front end and chekc if its role is 'instuctor'

  // create course
  const course = await prisma.course.create({
    data: {
      title: validate.data.title,
      description: validate.data.description,
      instructorId: validate.data.instructorId,
    },
  });

  return NextResponse.json(course, { status: 201 });
}
