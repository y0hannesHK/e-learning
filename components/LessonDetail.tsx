import {
  BookOpen,
  Video,
  List,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { Lesson } from '@/types/model_types';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * this props has two elemnems
 * 1. lessons - from the Lessonpage of the  /instrucor/courses/id/lesson/id
 * 2. lessonIncourse - from LessonDetailpage of the /student/courses/id/lesson/id
 */
interface LessonDetailProps {
  lesson?: Lesson;
  lessonsInCourse?: Lesson[]; // Pass all lessons of this course (ordered)
  courseId?: string;
  lessonId?: string;
}

export default async function LessonDetail({
  lesson,
  lessonsInCourse = [],
  courseId,
  lessonId,
}: LessonDetailProps) {
  const session = await getServerSession(authOptions);

  if (!lesson && session?.user.role === 'instrcuctor') {
    return (
      <div className="text-center text-gray-500 py-8">Lesson not found.</div>
    );
  }

  // Navigation logic for students
  /**
   * this logic is only depends on the length of lessonsInCourse
   */
  const currentIndex = lessonsInCourse.findIndex(
    (lesson) => lesson.id === lessonId
  );

  const prevLesson =
    currentIndex > 0 ? lessonsInCourse[currentIndex - 1] : null;

  const nextLesson =
    currentIndex < lessonsInCourse.length - 1
      ? lessonsInCourse[currentIndex + 1]
      : null;
  /**
   * if the role is student
   * the 'lesson' variable that is expected to come form /instrucor/courses/id/lesson/id would be undefined
   * so, it is assinged with  lesson = lessonsInCourse[currentIndex - 1];
   */
  if (session?.user.role === 'student') {
    lesson = lessonsInCourse[currentIndex];
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <Link
          href={`/${session?.user.role}/courses/${courseId!}/lessons`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Lessons
        </Link>
      </div>
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-blue-600" />
        <h2 className="text-2xl font-semibold">{lesson?.title}</h2>
      </div>

      {/* Order */}
      {lesson?.orderIndex !== undefined &&
        session?.user.role === 'instrcuctor' && (
          <p className="text-gray-500 text-sm mb-4">
            Lesson Order: {lesson?.orderIndex}
          </p>
        )}

      {/* Video */}
      {lesson?.videoUrl && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Video className="text-green-600" />
            <span className="font-medium">Lesson Video</span>
          </div>
          <video
            src={lesson?.videoUrl}
            controls
            className="w-full rounded-md border"
          />
        </div>
      )}

      {/* Contents */}
      {lesson?.contents?.length! > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <List className="text-purple-600" />
            <span className="font-medium">Lesson Contents</span>
          </div>
          <ol className="list-decimal list-inside space-y-2">
            {lesson?.contents.map((content, index) => (
              <li key={index} className="text-gray-700">
                {content}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Instructor Actions */}
      {session?.user.role === 'instructor' && (
        <div className="flex justify-around mt-6">
          <Link
            href={`${lesson?.id}/edit`}
            className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-500 rounded"
          >
            Edit
          </Link>
          <Link
            href={`${lesson?.id}/edit`}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-500 rounded"
          >
            Delete
          </Link>
        </div>
      )}

      {/* Student Navigation */}
      {session?.user.role === 'student' && (
        <div className="flex justify-between mt-8">
          {prevLesson ? (
            <Link
              href={`/student/courses/${prevLesson.courseId}/lessons/${prevLesson.id}`}
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/student/courses/${nextLesson.courseId}/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
