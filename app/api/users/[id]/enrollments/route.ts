import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get all courses a user enrolled
export async function GET(request: NextRequest, { params: { id } }: Props) {
  // check if user's enrolled in course/s
  const enrolledCourses = await prisma.enrollment.findMany({
    where: {
      studentId: id,
    },
    include: {
      course: true,
    },
  });
  if (!enrolledCourses) {
    return NextResponse.json({ data: 'no enrollments yet' }, { status: 200 });
  }

  // fetch courses from enrolledCourses
  const courses = enrolledCourses.map(
    (enrolledCourse) => enrolledCourse.course
  );

  return NextResponse.json(courses, { status: 200 });
}
