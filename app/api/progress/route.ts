import { NextRequest, NextResponse } from 'next/server';
import { createProgressSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';

interface StudentNameCourseNameProgress {
  studentName: string | null | undefined;
  courseName: string | null | undefined;
  progress: string | null | undefined;
}

// dev -  needs pagination
// get all progress and returns the student name, couurse title and percentage of progress
export async function GET(request: NextRequest) {
  try {
    const progresses = await prisma.progressTracking.findMany();
    /**
     * promise.all enable asyncronuous execute of function insde
     * if one fails so does all, try...catch resolves this
     * better than forEach method which execute syncronously
     */
    const detailedProgress = await Promise.all(
      progresses.map(async (progress) => {
        const student = await prisma.user.findUnique({
          where: { id: progress.studentId },
        });

        const lesson = await prisma.lesson.findUnique({
          where: { id: progress.lessonId },
        });

        const course = lesson
          ? await prisma.course.findUnique({
              where: { id: lesson.courseId },
            })
          : null;

        const totalLessons = course
          ? await prisma.lesson.count({
              where: { courseId: course.id },
            })
          : 0;

        const progressPercent =
          lesson && totalLessons
            ? `${Math.floor((lesson.orderIndex / totalLessons) * 100)}%`
            : '0%';

        const data: StudentNameCourseNameProgress = {
          studentName: student?.name,
          courseName: course?.title,
          progress: progressPercent,
        };

        return data;
      })
    );

    return NextResponse.json(detailedProgress, { status: 200 });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// create progress for a course
export async function POST(request: NextRequest) {
  try {
    // handle request
    const body = await request.json();
    const validate = createProgressSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 500 });
    }

    // dev - get lesson and studnet id from searhc params

    // create progress
    const progress = await prisma.progressTracking.create({
      data: {
        studentId: validate.data.studentId,
        lessonId: validate.data.lessonId,
        // i think 'the start is the never the end'
        isCompleted: false,
      },
    });

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
