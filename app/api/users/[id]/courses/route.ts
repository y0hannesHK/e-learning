import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get all course created by instructor
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const createdCourses = await prisma.course.findMany({
    where: {
      instructorId: id,
    },
  });

  if (!createdCourses) {
    return NextResponse.json(
      { error: 'no created course yet' },
      { status: 404 }
    );
  }

  return NextResponse.json(createdCourses, { status: 200 });
}
