import { prisma } from '@/prisma/client';
import { User, Enrollment } from '@/types/model_types';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get all students enrolled in course
export async function GET(request: NextRequest, { params: { id } }: Props) {
  // check if course's in enrollment table then fetch both course and student
  const enrollmentsInCourse = await prisma.enrollment.findMany({
    where: {
      courseId: id,
    },
    include: {
      student: true, // include each student enrolled in the course
    },
  });

  if (enrollmentsInCourse.length === 0) {
    return NextResponse.json({ data: 'no enrollments yet' }, { status: 200 });
  }

  // filter all studets fron enrollmentsInCourse
  const enrolledStudents: User[] = enrollmentsInCourse.map(
    (enrollment) => enrollment.student
  );

  return NextResponse.json(enrolledStudents, { status: 200 });
}
