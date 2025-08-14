import { PlayCircle, ListChecks } from 'lucide-react';
import Link from 'next/link';
import { Lesson } from '@/types/model_types';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

interface LessonListProps {
  lessons?: Lesson[];
}

export default async function LessonList({ lessons }: { lessons: Lesson[] }) {
  const session = await getServerSession(authOptions);
  if (!lessons || lessons.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <ListChecks className="mx-auto mb-2 h-8 w-8 text-gray-400" />
        <p className="m-2">No lessons found for this course.</p>
        <Link
          href={'lessons/new'}
          className="bg-emerald-600 p-2 m-2 border-b-cyan-950 text-white hover:bg-emerald-500 rounded-sm"
        >
          Create Lesson
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* only the instructor have the privillege to create lessons */}
      {session?.user.role === 'instructor' && (
        <div className="flex justify-around">
          <h2>Lessons</h2>
          <Link
            href={'lessons/new'}
            className="bg-emerald-600 p-2 m-2 border-b-cyan-950 text-white hover:bg-emerald-500 rounded-sm"
          >
            Create Lesson
          </Link>
        </div>
      )}

      <ul className="divide-y divide-gray-200 bg-white shadow rounded-lg">
        {lessons
          .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
          .map((lesson) => (
            <Link href={`lessons/${lesson.id}`} key={lesson.id}>
              <li className="p-4 hover:bg-gray-50 transition flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {lesson.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lesson.contents.length} content block
                    {lesson.contents.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {lesson.videoUrl ? (
                  <Link
                    href={lesson.videoUrl}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <PlayCircle className="h-5 w-5" /> Watch
                  </Link>
                ) : (
                  <span className="text-gray-400 italic text-sm">No video</span>
                )}
              </li>
            </Link>
          ))}
      </ul>
    </>
  );
}
